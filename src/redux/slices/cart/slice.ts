import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getCartFromLS from '../../../utils/getCartFromLS';
import { CartType, PizzaItems } from './types';

const initialState = getCartFromLS() as CartType;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<PizzaItems>) {
      const filterItem = state.items.filter((obj) => obj.id === action.payload.id);

      if (filterItem) {
        const findItem = filterItem.find(
          (obj) => obj.type === action.payload.type && obj.size === action.payload.size,
        );
        if (findItem) {
          findItem.count++;
        } else {
          state.items.push({
            ...action.payload,
            count: 1,
          });
        }
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    reduceItem(state, action: PayloadAction<PizzaItems>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    removeItem(state, action: PayloadAction<PizzaItems>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );
      if (findItem) {
        state.items = state.items.filter((obj) => obj !== findItem);
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, reduceItem, clearItems, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
