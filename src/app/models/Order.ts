import { CartProduct } from './CartProduct';

export interface Order {
  usedPaymentMethod: string;
  totalPrice: number;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  cartItems: Array<CartProduct>;
  phoneNumber?: string;
}
