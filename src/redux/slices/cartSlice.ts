import { createSlice } from '@reduxjs/toolkit';

export interface PizzaItems {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

interface InitialState {
  totalPrice: number;
  items: PizzaItems[];
}

const initialState = {
  totalPrice: 0,
  items: [],
} as InitialState;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
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

    reduceItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );
      if (findItem) {
        if (findItem.count > 1) {
          findItem.count--;
        } else {
          state.items = state.items.filter((obj) => obj !== findItem);
        }
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    removeItem(state, action) {
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
