import LinkButton from '../../ui/LinkButton';
import Button from '../../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { clearCart, getCart, getUsername } from './cartSlice';
import EmptyCart from './EmptyCart';

function Cart() {
  // const cart = fakeCart;

  const username = useSelector(getUsername);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type={'primary'}>
          Order pizzas
        </Button>

        {/* <Link to="/order/new">Order pizzas</Link> */}
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
