import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { getFilterCurrentPageSelector } from '../../redux/slices/filter/selecors';
import { setPageCount } from '../../redux/slices/filter/slice';

import style from './Pagination.module.scss';

const Pagination: FC = () => {
  const currentPage = useAppSelector(getFilterCurrentPageSelector);
  const dispatch = useAppDispatch();

  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=" >"
      onPageChange={(event) => dispatch(setPageCount(event.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="< "
    />
  );
};

export default Pagination;
