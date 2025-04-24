import { useDispatch, useSelector } from 'react-redux';
import Button from '../../UI/Button';

import { Form, useActionData, useNavigation } from 'react-router-dom';
import { fetchAddress } from '../user/userSlice';
import { getCart } from '../cart/cartSlice';
import { useState } from 'react';
import EmptyCart from '../cart/EmptyCart';

// https://uibakery.io/regex-library/phone-number

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();
  const dispatch = useDispatch();

  const {
    username,
    status: addressStatus,
    address,
    position,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const cart = useSelector(getCart);
  const isLoadingAddress = addressStatus === 'loading';
  // const username = useSelector(getUsername);
  // const address = useSelector(getUserAddress);
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">{`Ready to order? Let's go!`}</h2>

      {/* <Form method="POST"></Form> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        {/* Phone NUMBER */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="flex grow flex-col">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="text-ted-700 mt-2 rounded-md bg-red-100 p-2 text-xs">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        {/* ADDRESS */}
        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              disabled={isLoadingAddress}
              className="input w-full"
              defaultValue={address}
              type="text"
              name="address"
              required
            />
            {addressStatus === 'error' && (
              <p className="text-ted-700 mt-2 rounded-md bg-red-100 p-2 text-xs">
                {errorAddress}
              </p>
            )}
          </div>
          {/* INTEGRATE GEOLOCATION */}
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[4px] md:top-[4px]">
              <Button
                disabled={isLoadingAddress}
                type={'small'}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Location
              </Button>
            </span>
          )}
        </div>

        {/* CHECKBOX */}
        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        {/* SUBMITTING */}
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ''
            }
          />

          <Button type={'primary'} disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting ? 'Placing order...' : 'Start Order'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// export async function action({ request }) {
//   const formData = await request.formData();

//   const data = Object.fromEntries(formData);

//   const order = {
//     ...data,
//     cart: JSON.parse(data.cart),
//     priority: data.priority === 'on',
//   };

//   const errors = {};
//   if (!isValidPhone(order.phone)) {
//     errors.phone =
//       'please give us your correct phone number. we might need it to contact you';
//   }

//   if (Object.keys(errors).length) return errors;

//   // if everything is ok, we can create the order and redirect to the order page
//   const newOrder = await createOrder(order);

//   return redirect(`/order/${newOrder.id}`);
// }

export default CreateOrder;
