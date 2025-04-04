import { CartItem } from './CartItem';

export interface Order {
  paymentMethod: string;
  totalPrice: bigint;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  cartItems: CartItem[];
}
