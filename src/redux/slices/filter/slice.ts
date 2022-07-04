import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterNamesKeys, FilterPropertyKeys, FilterStateType, Sort } from './types';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sortType: {
    name: FilterNamesKeys.RATING,
    sortProperty: FilterPropertyKeys.RATINGDESC,
  },
  search: '',
} as FilterStateType;

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<Sort>) {
      state.sortType = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterStateType>) {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sortType = action.payload.sortType;
      state.search = action.payload.search;
    },
  },
});

export const { setCategoryId, setSortType, setSearch, setPageCount, setFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
