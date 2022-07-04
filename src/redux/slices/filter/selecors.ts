import { RootState } from '../../store';

export const getFilterSelector = (state: RootState) => state.filter;
export const getFilterCurrentPageSelector = (state: RootState) =>
  getFilterSelector(state).currentPage;
export const getFilterSortTypeSelector = (state: RootState) => getFilterSelector(state).sortType;
export const getFilterSearchSelector = (state: RootState) => getFilterSelector(state).search;
export const getFilterCategoryIdSelector = (state: RootState) =>
  getFilterSelector(state).categoryId;
