import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { setCategoryId } from '../redux/slices/filterSlice';

type Props = {};

const Categories: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const categoryId = useAppSelector((store) => store.filter.categoryId);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((el, i) => (
          <li
            key={i}
            onClick={() => dispatch(setCategoryId(i))}
            className={categoryId === i ? 'active' : ''}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
