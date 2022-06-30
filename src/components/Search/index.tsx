import { FC, useContext } from 'react';
import { AppContext } from '../../App';

import styles from './Search.module.scss';

type Props = {};

const SearchPizza: FC<Props> = () => {
  const { search, setSearch } = useContext(AppContext);

  return (
    <div className={styles.root}>
      <svg className={styles.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <defs></defs>

        <title />
        <g data-name="Layer 2" id="Layer_2">
          <path d="M13,23A10,10,0,1,1,23,13,10,10,0,0,1,13,23ZM13,5a8,8,0,1,0,8,8A8,8,0,0,0,13,5Z" />
          <path d="M28,29a1,1,0,0,1-.71-.29l-8-8a1,1,0,0,1,1.42-1.42l8,8a1,1,0,0,1,0,1.42A1,1,0,0,1,28,29Z" />
        </g>
        <g id="frame">
          <rect style={{ fill: 'none' }} height="32" width="32" />
        </g>
      </svg>
      <input
        className={styles.input}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Введите название пиццы..."
      />
    </div>
  );
};

export default SearchPizza;
