import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchPizasParams, PizzasInitialType, PizzaType, Status } from './types';

export const fetchPizzasAction = createAsyncThunk<PizzaType[], fetchPizasParams>(
  `pizzas/fetchPizzasStatus`,
  async (params) => {
    const { category, searchFetch, currentPage, sortProperty } = params;
    const { data } = await axios.get<PizzaType[]>(
      `https://62a8befbec36bf40bdad383f.mockapi.io/pizzas?page=${currentPage}&limit=8&${category}&sortBy=${sortProperty}${searchFetch}`,
    );
    return data;
  },
);

const initialState = {
  pizzaItems: [],
  status: Status.LOADING,
} as PizzasInitialType;

const cartSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<PizzaType[]>) {
      state.pizzaItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzasAction.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzaItems = [];
    });
    builder.addCase(fetchPizzasAction.fulfilled, (state, action: PayloadAction<PizzaType[]>) => {
      state.pizzaItems = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzasAction.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzaItems = [];
    });
  },
});

export const { setPizzas } = cartSlice.actions;
export default cartSlice.reducer;
