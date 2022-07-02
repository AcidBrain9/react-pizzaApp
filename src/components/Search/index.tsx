import { ChangeEvent, FC, useCallback, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { setSearch } from '../../redux/slices/filterSlice';

import debounce from 'lodash.debounce';

import styles from './Search.module.scss';

type Props = {};

const SearchPizza: FC<Props> = () => {
  const [value, setValue] = useState('');

  const dispatch = useAppDispatch();

  const searchInput = useRef<HTMLInputElement>(null);

  const updateSerchValue = useCallback(
    debounce((str) => dispatch(setSearch(str)), 500),
    [],
  );

  const handleClear = () => {
    setValue('');
    updateSerchValue('');
    searchInput.current?.focus();
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSerchValue(e.target.value);
  };

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
        ref={searchInput}
        className={styles.input}
        value={value}
        onChange={(e) => handleSearch(e)}
        type="text"
        placeholder="Введите название пиццы..."
      />
      {value && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 512 512"
          height="512px"
          className={styles.cross}
          onClick={handleClear}
          id="Layer_1"
          version="1.1"
          viewBox="0 0 512 512"
          width="512px">
          <path
            d="M256,7C118.467,7,7,118.468,7,256.002C7,393.533,118.467,505,256,505s249-111.467,249-248.998  C505,118.468,393.533,7,256,7z M256,485.08c-126.31,0-229.08-102.771-229.08-229.078C26.92,129.692,129.69,26.92,256,26.92  c126.309,0,229.08,102.771,229.08,229.082C485.08,382.309,382.309,485.08,256,485.08z"
            fill="#425661"
          />
          <polygon
            fill="#425661"
            points="368.545,157.073 354.461,142.988 255.863,241.587 157.733,143.456 143.648,157.54 241.78,255.672   143.648,353.809 157.733,367.893 255.863,269.75 354.461,368.361 368.545,354.275 269.947,255.672 "
          />
        </svg>
      )}
    </div>
  );
};

export default SearchPizza;
