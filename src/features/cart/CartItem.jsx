import { formatCurrency } from '../../utils/helpers';
import PropTypes from 'prop-types';
import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './UpdateItemQuantity';
import { useSelector } from 'react-redux';
import { getCurrentQuantityById } from './cartSlice';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice, ingredients } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <div>
        <p className="mb-1 sm:mb-0">
          {quantity}&times; {name}
        </p>
        <p className="text-sm text-stone-500">
          {ingredients.length > 0
            ? ingredients.join(', ')
            : 'No ingredients'}{' '}
        </p>
      </div>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />

        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
CartItem.propTypes = {
  item: PropTypes.shape({
    pizzaId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
