import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { getCartItemsByIdSelector } from '../../redux/slices/cart/selecors';
import { addItem } from '../../redux/slices/cart/slice';
import { PizzaItems } from '../../redux/slices/cart/types';
import { PizzaType } from '../../redux/slices/pizzas/types';

const pizzaTypeNames: string[] = ['тонкое', 'традиционное'];

const PizzaBlock: React.FC<PizzaType> = React.memo(
  ({ id, title, price, imageUrl, sizes, types }) => {
    const [activePizzaType, setActivePizzaType] = React.useState<number>(types[0]);
    const [activePizzaSize, setActivePizzaSize] = React.useState<number>(0);

    const pizzaCount = useAppSelector(getCartItemsByIdSelector(id));

    const dispatch = useAppDispatch();

    const onClickAddPizza = () => {
      const item = {
        id,
        title,
        price,
        imageUrl,
        type: pizzaTypeNames[activePizzaType],
        size: sizes[activePizzaSize],
      };
      dispatch(addItem(item as PizzaItems));
    };

    return (
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />{' '}
          <h4 className="pizza-block__title">{title}</h4>
        </Link>

        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li
                onClick={() => setActivePizzaType(type)}
                className={activePizzaType === type ? 'active' : ''}
                key={type}>
                {pizzaTypeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                onClick={() => setActivePizzaSize(i)}
                className={activePizzaSize === i ? 'active' : ''}
                key={i}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button className="button button--outline button--add" onClick={onClickAddPizza}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {pizzaCount.length > 0 && (
              <i>
                {pizzaCount.reduce((sum, obj) => {
                  return obj.count + sum;
                }, 0)}
              </i>
            )}
          </button>
        </div>
      </div>
    );
  },
);

export default PizzaBlock;
