import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  categoryId: number;
  currentPage: number;
  sortType: {
    name: string;
    sortProperty: string;
  }
  search: string
}

const initialState = { categoryId: 0, 
  currentPage: 1,
  sortType: {
  name: 'популярности',
  sortProperty: 'rating&order=desc',
  },
  search: '',
} as InitialState

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSortType(state, action) {
      state.sortType = action.payload
    },
    setPageCount(state, action) {
      state.currentPage = action.payload
    },
    setSearch(state, action) {
      state.search = action.payload
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId)
      state.currentPage = Number(action.payload.currentPage)
      state.sortType = action.payload.sortType
      state.search = action.payload.search
    }

  },
})

export const { setCategoryId, setSortType, setSearch, setPageCount, setFilters } = filterSlice.actions
export default filterSlice.reducer