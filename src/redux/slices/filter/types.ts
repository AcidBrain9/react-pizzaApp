export type Sort = {
  name: FilterNamesKeys.RATING | FilterNamesKeys.PRICE | FilterNamesKeys.ALPH;
  sortProperty:
    | FilterPropertyKeys.PRICEASC
    | FilterPropertyKeys.PRICEDESC
    | FilterPropertyKeys.RATINGASC
    | FilterPropertyKeys.RATINGDESC
    | FilterPropertyKeys.TITLEASC
    | FilterPropertyKeys.TITLEDESC;
};

export enum FilterNamesKeys {
  RATING = `популярности`,
  PRICE = `цене`,
  ALPH = `алфавиту`,
}
export enum FilterPropertyKeys {
  RATINGDESC = `rating&order=desc`,
  RATINGASC = `rating&order=asc`,
  PRICEDESC = `price&order=desc`,
  PRICEASC = `price&order=asc`,
  TITLEDESC = `title&order=desc`,
  TITLEASC = `title&order=asc`,
}

export interface FilterStateType {
  categoryId: number;
  currentPage: number;
  sortType: Sort;
  search: string;
}
