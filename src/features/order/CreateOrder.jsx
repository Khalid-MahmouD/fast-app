import { useSelector } from 'react-redux';
import Button from '../../UI/Button';

import { Form, useActionData, useNavigation } from 'react-router-dom';

// https://uibakery.io/regex-library/phone-number

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetable',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  console.log(navigation.state);
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();

  const username = useSelector(state => state.user.username);
  // console.log(Object.keys(formErrors));

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  return (
    <div className='px-4 py-6'>
      <h2 className='text-xl font-semibold mb-8'>{`Ready to order? Let's go!`}</h2>

      {/* <Form method="POST"></Form> */}
      <Form method="POST">
        <div className='flex flex-col gap-2  sm:flex-row sm:items-center mb-5'>
          <label className='sm:basis-40'>First Name</label>
          <input className='input grow ' type="text" name="customer" required defaultValue={username} />
        </div>

        {/* Phone NUMBER */}
        <div className='flex flex-col gap-2  sm:flex-row sm:items-center mb-5'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow flex flex-col'>
            <input className='input w-full' type="tel" name="phone" required />
            {formErrors?.phone && <p className='mt-2 text-xs text-ted-700 bg-red-100 rounded-md p-2'>{formErrors.phone}</p>}
          </div>
        </div>

        {/* ADDRESS */}
        <div className='flex flex-col gap-2  sm:flex-row sm:items-center mb-5'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              className='input w-full'
              type="text" name="address" required />
          </div>
        </div>

        {/* CHECKBOX */}
        <div className='mb-12 flex items-center gap-5 '>
          <input
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type="checkbox"
            name="priority"
            id="priority"
          // value={withPriority}
          // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className='font-medium' htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        {/* SUBMITTING */}
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button
            type={"primary"}
            disabled={isSubmitting}
          >
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
