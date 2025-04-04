import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ProductCart } from '../models/ProductCart';
import { LocalCartProduct } from '../models/LocalCartProduct';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private authService: AuthService = inject(AuthService);
  public cartItems: ProductCart[] = [];

  private getCartItemsFromDatabase(): LocalCartProduct[] {
    return [];
  }

  private getCartItemsFromLocalStorage(): LocalCartProduct[] {
    const optionalProducts = localStorage.getItem('CartItems');
    if (optionalProducts == null) {
      return [];
    } else {
      const notVerifiedCartItems = JSON.parse(optionalProducts);
      return notVerifiedCartItems;
    }
  }
  public getCartItems(): LocalCartProduct[] | [] {
    if (!this.authService.isAuthenticated()) {
      return this.getCartItemsFromLocalStorage();
    } else {
      return this.getCartItemsFromDatabase();
    }
  }

  public addCartItem(product: Product): void {
    if (product.stock < 1) {
      window.alert('Product is not available. Try again later.');
      return;
    }
    if (!this.authService.isAuthenticated()) {
      this.addCartItemToLocalStorage(product);
    } else {
      this.addCartItemToDatabase(product);
    }
  }

  private addCartItemToDatabase(product: Product): void {}

  private addCartItemToLocalStorage(product: Product): void {
    const cartItems: LocalCartProduct[] = this.getCartItemsFromLocalStorage();
    const productAlreadyInCart = cartItems.find(
      (cartProduct) => cartProduct.id === product.id
    );
    if (productAlreadyInCart) {
      if (productAlreadyInCart.quantity >= product.stock) {
        window.alert('There are no more items in stock at the moment!');
        return;
      }
      if (productAlreadyInCart.quantity >= 10) {
        window.alert('You can only order 10 of the same items');
        return;
      } else {
        productAlreadyInCart.quantity += 1;
      }
    } else {
      cartItems.push({ id: product.id, quantity: 1 });
    }
    localStorage.setItem('CartItems', JSON.stringify(cartItems));
  }

  public changeCartItemQuantity(productCart: ProductCart): void {
    if (!this.authService.isAuthenticated()) {
      const cartItems: LocalCartProduct[] = this.getCartItemsFromLocalStorage();
      const product = cartItems.find(
        (product) => product.id === productCart.id
      );
      if (product) {
        product.quantity = Number(productCart.quantity);
        localStorage.setItem('CartItems', JSON.stringify(cartItems));
      }
    } else {
      window.alert('This logic is not implemented yet');
    }
  }

  public clearCartItems(): void {
    if (!this.authService.isAuthenticated()) {
      localStorage.removeItem('CartItems');
    } else {
      window.alert('This logic is not implemented yet');
    }
  }
}
