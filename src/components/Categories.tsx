import { FC, useState } from 'react';

type Props = {
  setCategory: (i: number) => void;
  activeCategory: number;
};

const Categories: FC<Props> = ({ setCategory, activeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((el, i) => (
          <li
            key={i}
            onClick={() => setCategory(i)}
            className={activeCategory === i ? 'active' : ''}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
