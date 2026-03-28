import { Product } from './Product';

interface CartItem {
  product: Product;
}
export interface SavedCart {
  totalPrice: number;
  savedCartItems: CartItem[];
}
