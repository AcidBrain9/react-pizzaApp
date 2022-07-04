export interface PizzaItems {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

export interface CartType {
  totalPrice: number;
  items: PizzaItems[];
}
