import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subject, take, takeUntil } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { CartProductDetailed } from '../../models/CartProductDetailed';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-card',
  imports: [NgIf, NgFor, FormsModule],
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

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    if (!this.authService.isAuthenticated()) {
      this.cartService
        .getCartProductsLocal()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (productItems: CartProductDetailed[]) => {
            this.cartProducts = productItems;
          },
          error: (err) => {
            console.error('Error loading cart products:', err);
          },
        });
    } else {
      this.cartService
        .getShoppingCartFromDatabase()
        .pipe(takeUntil(this.destroy$))
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
  }

  protected removeCartItem(product: CartProductDetailed): void {
    this.cartService
      .removeCartItem(product)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {},
        error: (err) => {
          console.error('Error removing cart item:', err);
          window.alert('Failed to remove the item. Please try again.');
        },
        complete: () => {
          {
            this.loadProducts();
          }
        },
      });
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
}
