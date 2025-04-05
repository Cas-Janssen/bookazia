import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subject } from 'rxjs';
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
  private destroy$ = new Subject<void>();
  public cartProducts: CartProductDetailed[] = [];
  public totalPrice: number = 0;

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    if (!this.authService.isAuthenticated()) {
      this.cartService.getCartProductsLocal().subscribe({
        next: (productItems: CartProductDetailed[]) => {
          this.cartProducts = productItems;
        },
        error: (err) => {
          console.error('Error loading cart products:', err);
        },
      });
    } else {
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
    this.cartService.removeCartItem(product);
    if (this.cartProducts.length == 1) {
      this.cartProducts = [];
      return;
    }
    this.loadProducts();
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
