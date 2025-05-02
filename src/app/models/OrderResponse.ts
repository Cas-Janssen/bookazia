interface OrderProducts {
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
  orderProducts: OrderProducts[];
  orderStatus: string;
  createdAt: Date;
  updatedAt: Date;
}
