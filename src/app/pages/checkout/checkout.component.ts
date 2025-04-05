import { Component, inject } from '@angular/core';
import { PersonalInfoComponent } from './steps/1-personal-info/personal-info.component';
import { DeliveryOptionComponent } from './steps/2-delivery-option/delivery-option.component';
import { PaymentComponent } from './steps/3-payment/payment.component';
import { NgIf } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Order } from '../../models/Order';
import { UserInfo } from '../../models/UserInfo';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { CartProductDetailed } from '../../models/CartProductDetailed';
import { CartProduct } from '../../models/CartProduct';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [
    PersonalInfoComponent,
    DeliveryOptionComponent,
    PaymentComponent,
    NgIf,
  ],
})
export class CheckoutComponent {
  protected currentStep: number = 1;
  protected personalInfo!: UserInfo;
  protected deliveryOption: string = '';
  protected paymentMethod: string = '';
  private cartService: CartService = inject(CartService);
  private orderService: OrderService = inject(OrderService);
  private authService: AuthService = inject(AuthService);

  protected nextStep(): void {
    if (this.isStepValid()) {
      this.currentStep++;
    } else {
      window.alert('Please fill out all required fields before proceeding.');
    }
  }

  protected previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  private isStepValid(): boolean {
    if (this.currentStep === 1) {
      return (
        !!this.personalInfo &&
        !!this.personalInfo.firstName &&
        !!this.personalInfo.lastName &&
        !!this.personalInfo.email &&
        !!this.personalInfo.address &&
        !!this.personalInfo.city &&
        !!this.personalInfo.postalCode
      );
    } else if (this.currentStep === 2) {
      return !!this.deliveryOption;
    } else if (this.currentStep === 3) {
      return !!this.paymentMethod;
    }
    return true;
  }

  protected submitOrder(): void {
    if (!this.isStepValid()) {
      window.alert('Please fill out all required fields before proceeding.');
      return;
    }
    if (!this.authService.isAuthenticated()) {
      const cartProducts = this.cartService.getCartProductsLocal().subscribe({
        next: (cartProducts) => {
          if (!cartProducts || cartProducts.length === 0) {
            window.alert(
              'Your cart is empty. Please add items to your cart before placing an order.'
            );
            return;
          }
          const totalPrice = this.cartService.getTotalPriceOfCart(cartProducts);
          if (totalPrice <= 0) {
            window.alert(
              'Your cart total price is invalid. Please check your cart items.'
            );
            return;
          }

          const cartProductsList: CartProduct[] = [];
          cartProducts.forEach((product: CartProductDetailed) => {
            const cartProduct: CartProduct = {
              productId: product.id,
              productPrice: product.price,
              quantity: product.quantity,
            };
            cartProductsList.push(cartProduct);
          });
          this.sendOrderToService(cartProductsList, totalPrice);
        },
        error: (error) => {
          console.error('Error fetching cart products:', error);
          window.alert('An error occurred while fetching cart products.');
        },
      });
    } else {
      // const cartProducts: CartProductDetailed[] =
      // this.cartService.getCartProducts();
      // const cartItems: CartProduct[] = [];
      // cartProducts.forEach((product: CartProductDetailed) => {
      //   const cartItem: CartProduct = {
      //     productId: product.id,
      //     productPrice: product.price,
      //     quantity: product.quantity,
      //   };
      //   cartItems.push(cartItem);
      // });
    }
  }

  private sendOrderToService(
    cartItems: CartProduct[],
    totalPrice: number
  ): void {
    const order: Order = {
      usedPaymentMethod: this.paymentMethod,
      totalPrice: totalPrice,
      email: this.personalInfo.email,
      firstName: this.personalInfo.firstName,
      lastName: this.personalInfo.lastName,
      address: this.personalInfo.address,
      city: this.personalInfo.city,
      postalCode: this.personalInfo.postalCode,
      middleName: this.personalInfo.middleName,
      phoneNumber: this.personalInfo.phoneNumber,
      cartItems: cartItems,
    };
    this.orderService.placeOrder(order);
  }
}
