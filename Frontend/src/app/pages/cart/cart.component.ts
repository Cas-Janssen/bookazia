import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subject, takeUntil, finalize } from 'rxjs';

import { CartProductDetailed } from '../../models/CartProductDetailed';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  private cartService: CartService = inject(CartService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private destroy$: Subject<void> = new Subject<void>();
  public cartProducts: CartProductDetailed[] = [];
  public totalPrice: number = 0;
  public isLoading: boolean = true;

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.isLoading = true;

    if (!this.authService.isAuthenticated()) {
      this.cartService
        .getCartProductsLocal()
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => (this.isLoading = false))
        )
        .subscribe({
          next: (productItems: CartProductDetailed[]) => {
            this.cartProducts = productItems;
            this.totalPrice =
              this.cartService.getTotalPriceOfCart(productItems);
          },
          error: (err) => {
            console.error('Error loading cart products:', err);
          },
        });
    } else {
      this.cartService
        .getShoppingCartFromDatabase()
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => (this.isLoading = false))
        )
        .subscribe({
          next: (cart) => {
            this.totalPrice = cart.totalPrice;
            this.cartProducts = cart.cartItems.map(
              (item): CartProductDetailed => {
                return {
                  id: item.product.id,
                  name: item.product.title,
                  coverImgUrl: item.product.coverImgUrl,
                  price: item.product.price,
                  quantity: item.quantity,
                  totalPrice: (item.product.price * item.quantity).toFixed(2),
                  stock: item.product.stock,
                };
              }
            );
          },
          error: (err) => {
            console.error('Error loading cart from database:', err);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected updateTotalPrice(product: CartProductDetailed): void {
    product.totalPrice = (product.quantity * product.price).toFixed(2);
    this.cartService.changeCartItemQuantity(product);
    this.totalPrice = 0;
    for (product of this.cartProducts) {
      this.totalPrice += product.price * product.quantity;
    }
  }

  protected removeCartItem(product: CartProductDetailed): void {
    this.cartService.removeCartItem(product);
    this.cartProducts = this.cartProducts.filter(
      (item) => item.id !== product.id
    );
    this.totalPrice = this.cartProducts.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  protected clearCartItems(): void {
    this.cartService.clearCartItems();
    this.cartProducts = [];
  }

  protected placeOrder(): void {
    if (this.cartProducts.length === 0) {
      window.alert(
        'Your cart is empty! Please add items to your cart before checking out.'
      );
      return;
    } else this.router.navigate(['/checkout']);
  }

  protected getQuantityArray(stock: number): number[] {
    const amount = Array.from({ length: stock }, (_, i) => i + 1);
    if (amount.length > 10) {
      return amount.slice(0, 10);
    }
    return amount;
  }

  protected navigateToBooks(): void {
    this.router.navigate(['/books']);
  }
}
