import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { setPageCount } from '../../redux/slices/filterSlice';

import style from './Pagination.module.scss';

type Props = {};

const Pagination: FC<Props> = () => {
  const currentPage = useAppSelector((store) => store.filter.currentPage);
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
