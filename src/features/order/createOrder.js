import { redirect } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { clearCart } from '../cart/cartSlice';
import store from '../../store';
import { updateAddress, updatePhoneNumber } from '../user/userSlice';

const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str,
    );

export async function action({ request }) {
    const formData = await request.formData();

    const data = Object.fromEntries(formData);

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === 'true',
    };
    console.log(order, typeof order.address, order.phone);

    store.dispatch(updatePhoneNumber(order.phone));
    store.dispatch(updateAddress(order.address));

    const errors = {};
    if (!isValidPhone(order.phone)) {
        errors.phone =
            'please give us your correct phone number. we might need it to contact you';
    }

    if (Object.keys(errors).length) return errors;

    // if everything is ok, we can create the order and redirect to the order page
    const newOrder = await createOrder(order);
    store.dispatch(clearCart());

    return redirect(`/order/${newOrder.id}`);
}