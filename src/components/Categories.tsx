import { FC, useState } from 'react';

type Props = {};

const Categories: FC<Props> = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const handleCHangeCategory = (idx: number) => {
    setActiveIndex(idx);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((el, i) => (
          <li
            key={i}
            onClick={() => handleCHangeCategory(i)}
            className={activeIndex === i ? 'active' : ''}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
