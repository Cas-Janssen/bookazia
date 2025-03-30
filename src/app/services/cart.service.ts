import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ProductCart } from '../models/ProductCart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private authService: AuthService = inject(AuthService);
  public cartItems: ProductCart[] = [];

  constructor() {
    if (this.authService.isAuthenticated()) {
      const cartItems = this.getCartItemsFromDatabase();
    } else {
      this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    }
  }

  private getCartItemsFromDatabase(): ProductCart[] {
    return [];
  }
}
