import { CartProduct } from './CartProduct';

export interface ShoppingCart {
  totalPrice: number;
  cartItems: CartProduct[];
}
