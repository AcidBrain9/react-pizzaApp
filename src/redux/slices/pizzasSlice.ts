import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzaType } from '../../App';

interface fetchPizasParams {
  category: string;
  searchFetch: string;
  currentPage: number;
  sortProperty: string;
}

export const fetchPizzasAction = createAsyncThunk(
  `pizzas/fetchPizzasStatus`,
  async (params: fetchPizasParams) => {
    const { category, searchFetch, currentPage, sortProperty } = params;
    const { data } = await axios.get(
      `https://62a8befbec36bf40bdad383f.mockapi.io/pizzas?page=${currentPage}&limit=8&${category}&sortBy=${sortProperty}${searchFetch}`,
    );
    return data;
  },
);
interface InitialState {
  pizzaItems: PizzaType[];
  status: string;
}
const initialState = {
  pizzaItems: [],
  status: 'loading',
} as InitialState;

const cartSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzaItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzasAction.pending, (state) => {
      state.status = 'loading';
      state.pizzaItems = [];
    });
    builder.addCase(fetchPizzasAction.fulfilled, (state, action) => {
      state.pizzaItems = action.payload;
      state.status = 'succes';
    });
    builder.addCase(fetchPizzasAction.rejected, (state) => {
      state.status = 'error';
      state.pizzaItems = [];
    });
  },
});

export const { setPizzas } = cartSlice.actions;
export default cartSlice.reducer;
