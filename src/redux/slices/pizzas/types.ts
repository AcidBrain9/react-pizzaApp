export interface PizzaType {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  category: number;
  rating: number;
}
export interface fetchPizasParams {
  category: string;
  searchFetch: string;
  currentPage: number;
  sortProperty: string;
}

export interface PizzasInitialType {
  pizzaItems: PizzaType[];
  status: Status.LOADING | Status.SUCCESS | Status.ERROR;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
