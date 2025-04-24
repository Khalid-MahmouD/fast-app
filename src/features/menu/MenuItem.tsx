import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';
type pizza = {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
  isPizzaInCart: boolean;
};

function MenuItem({ pizza: pizza }) {

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      ingredients,
      totalPrice: unitPrice * 1,
    }
    dispatch(addItem(newItem))
  }
  return (
    <li className="flex gap-4">
      <img
        src={imageUrl}
        alt={name}
        className={`${soldOut ? 'opacity-70 grayscale' : ''} h-24`}
      />
      <div className="flex flex-grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex flex-1 items-center justify-between">

          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {!soldOut && isInCart && <div className='flex items-center gap-2 sm:gap-8'>
            <UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity} />
            <DeleteItem pizzaId={id} />

          </div>
          }

          {!soldOut && !isInCart && <Button type={'small'} onClick={handleAddToCart}>Add Card</Button>}
        </div>
      </div>
    </li>
  );
}

MenuItem.propTypes = {
  pizza: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    soldOut: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MenuItem;
