import React from 'react';
import { useAppDispatch } from '../hooks/reduxHook';
import { setCategoryId } from '../redux/slices/filter/slice';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type Props = {
  categoryId: number;
};

const Categories: React.FC<Props> = React.memo(({ categoryId }) => {
  const dispatch = useAppDispatch();

  const onChangeCategory = (i: number) => {
    dispatch(setCategoryId(i));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((el, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={categoryId === i ? 'active' : ''}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
