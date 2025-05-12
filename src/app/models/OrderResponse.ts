export interface OrderProduct {
  quantity: number;
  product: {
    id: number;
    coverImgUrl: string;
    title: string;
    isbn: string;
  };
  price: number;
}
export interface OrderResponse {
  id: number;
  usedPaymentMethod: string;
  totalPrice: number;
  orderProducts: OrderProduct[];
  orderStatus: string;
  createdAt: Date;
  updatedAt: Date;
}
