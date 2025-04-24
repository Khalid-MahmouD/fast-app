import { useFetcher } from 'react-router-dom';
import Button from '../../UI/Button';
import { updateOrder } from '../../services/apiRestaurant';
import store from '../../store';
import { updateAddress, updatePhoneNumber } from '../user/userSlice';

function UpdateOrders({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <input
        type="text"
        name="address"
        placeholder="Update Address"
        className="input"
      />
      <input
        type="text"
        name="phone"
        placeholder="Update Phone"
        className="input"
      />
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrders;

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);
  const updatedEntries = {
    priority: true,
  };
  await updateOrder(params.orderId, updatedEntries);
  store.dispatch(updateAddress(data.address));
  store.dispatch(updatePhoneNumber(data.phone));

  await updateOrder(params.orderId, { phone: data.phone });
  return null;
}
