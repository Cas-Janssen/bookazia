import { Product } from './Product';

export interface ShoppingCart {
  totalPrice: number;
  cartItems: { id: number; product: Product; quantity: number }[];
}
