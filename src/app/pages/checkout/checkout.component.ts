import { Component, inject, OnDestroy } from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';
import { SimpleCartProduct } from '../../models/SimpleCartProduct';

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
export class CheckoutComponent implements OnDestroy {
  protected currentStep: number = 1;
  protected personalInfo!: UserInfo;
  protected deliveryOption: string = '';
  protected paymentMethod: string = '';
  private destroy$ = new Subject<void>();
  private cartService: CartService = inject(CartService);
  private orderService: OrderService = inject(OrderService);
  private authService: AuthService = inject(AuthService);

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
      this.cartService
        .getCartProductsLocal()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (cartProducts) => {
            if (!cartProducts || cartProducts.length === 0) {
              window.alert(
                'Your cart is empty. Please add items to your cart before placing an order.'
              );
              return;
            }
            const totalPrice =
              this.cartService.getTotalPriceOfCart(cartProducts);
            if (totalPrice <= 0) {
              window.alert(
                'Your cart total price is invalid. Please check your cart items.'
              );
              return;
            }

            const cartProductsList: SimpleCartProduct[] = [];
            cartProducts.forEach((product: CartProductDetailed) => {
              const cartProduct: SimpleCartProduct = {
                productId: product.id,
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
      const cartProducts: SimpleCartProduct[] = [];
      let totalPrice: number = 0;
      this.cartService
        .getShoppingCartFromDatabase()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (cart) => {
            if (!cart || cart.cartItems.length === 0) {
              window.alert(
                'Your cart is empty. Please add items to your cart before placing an order.'
              );
              return;
            }
            if (cart.totalPrice <= 0) {
              window.alert(
                'Your cart total price is invalid. Please check your cart items.'
              );
              return;
            }
            totalPrice = cart.totalPrice;
            cart.cartItems.forEach((product) => {
              const cartProduct: SimpleCartProduct = {
                productId: product.product.id,
                quantity: product.quantity,
              };
              cartProducts.push(cartProduct);
            });
            this.sendOrderToService(cartProducts, totalPrice);
          },
          error: (error) => {
            console.error('Error fetching cart products:', error);
            window.alert('An error occurred while fetching cart products.');
          },
        });
    }
  }

  private sendOrderToService(
    cartItems: SimpleCartProduct[],
    totalPrice: number
  ): void {
    const order: Order = {
      usedPaymentMethod: this.paymentMethod,
      totalPrice: totalPrice,
      email: this.personalInfo.email,
      firstName: this.personalInfo.firstName,
      lastName: this.personalInfo.lastName,
      address: this.personalInfo.address!,
      city: this.personalInfo.city!,
      postalCode: this.personalInfo.postalCode!,
      middleName: this.personalInfo.middleName,
      phoneNumber: this.personalInfo.phoneNumber,
      cartItems: cartItems,
    };
    console.log('Order:', order);
    this.orderService.placeOrder(order);
    //this.cartService.clearCartItems();
  }
}
