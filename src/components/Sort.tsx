import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { setSortType } from '../redux/slices/filter/slice';
import {
  FilterNamesKeys,
  FilterPropertyKeys,
  Sort as SortType,
} from '../redux/slices/filter/types';

const sort: SortType[] = [
  { name: FilterNamesKeys.RATING, sortProperty: FilterPropertyKeys.RATINGDESC },
  { name: FilterNamesKeys.PRICE, sortProperty: FilterPropertyKeys.PRICEDESC },
  { name: FilterNamesKeys.ALPH, sortProperty: FilterPropertyKeys.TITLEDESC },
];

type Props = {
  sortType: SortType;
};

const Sort: React.FC<Props> = React.memo(({ sortType }) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [sorting, setSorting] = React.useState<boolean>(true);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const handleChangeSort = (i: SortType) => {
    if (i.sortProperty === sortType.sortProperty) {
      const newi: SortType = {
        ...i,
        sortProperty: i.sortProperty.replace('desc', 'asc'),
      } as SortType;
      setSorting(false);
      setIsVisible(false);
      dispatch(setSortType(newi));
    } else {
      setSorting(true);
      setIsVisible(false);
      dispatch(setSortType(i));
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event?.path?.includes(sortRef.current)) {
        setIsVisible(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          style={sorting ? { transform: 'rotate(180deg)' } : {}}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{sortType.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sort.map((el) => (
              <li
                onClick={() => handleChangeSort(el)}
                key={el.name}
                className={sortType.name === el.name ? 'active' : ''}>
                {el.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
