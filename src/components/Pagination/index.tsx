import { FC } from 'react';
import ReactPaginate from 'react-paginate';

import style from './Pagination.module.scss';

type Props = {
  onChangePage: (number: number) => void;
};

const Pagination: FC<Props> = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=" >"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="< "
      // renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
