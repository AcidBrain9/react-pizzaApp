import { RootState } from '../../store';

export const getCartSelector = (state: RootState) => state.cart;
export const getCartItemsSelector = (state: RootState) => getCartSelector(state).items;
export const getCartItemsByIdSelector = (id: number) => (state: RootState) =>
  getCartSelector(state).items.filter((obj) => obj.id === id);
export const getCartTotalSelector = (state: RootState) => getCartSelector(state).totalPrice;
