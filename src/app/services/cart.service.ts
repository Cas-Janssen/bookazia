import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CartProductDetailed } from '../models/CartProductDetailed';
import { SimpleCartProduct } from '../models/SimpleCartProduct';
import { Product } from '../models/Product';
import { ProductService } from './product.service';
import { forkJoin, map, Observable } from 'rxjs';
import { CartProduct } from '../models/CartProduct';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private authService: AuthService = inject(AuthService);
  private productService: ProductService = inject(ProductService);
  private httpClient: HttpClient = inject(HttpClient);
  private apiLink: String = environment.apiUrl;
  public cartProducts: CartProduct[] = [];

  private getCartItemsFromDatabase(): [] {
    const cartItems: any = this.httpClient.get<any>(this.apiLink + 'user/cart');
    console.log('cartItems', cartItems);
    return [];
  }

  private getCartItemsFromLocalStorage(): SimpleCartProduct[] {
    const optionalProducts: any = localStorage.getItem('CartItems');
    if (optionalProducts == null) {
      return [];
    } else {
      const localCartItems: SimpleCartProduct[] = JSON.parse(optionalProducts);
      return localCartItems;
    }
  }

  public getCartProducts(): CartProductDetailed[] | [] {
    const cartItems: any = this.getCartItemsFromDatabase();
    return [];
  }

  public getCartProductsLocal(): Observable<CartProductDetailed[]> {
    const simpleProducts: SimpleCartProduct[] =
      this.getCartItemsFromLocalStorage();
    const cartProducts$ = forkJoin(
      simpleProducts.map((product) =>
        this.productService.getProductById(product.id).pipe(
          map((productData) => ({
            id: productData.id,
            name: productData.title,
            coverImgUrl: productData.coverImgUrl,
            price: productData.price,
            quantity: product.quantity,
            totalPrice: (productData.price * product.quantity).toFixed(2),
            stock: productData.stock,
          }))
        )
      )
    );
    return cartProducts$ || [];
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
    const cartItems: SimpleCartProduct[] = this.getCartItemsFromLocalStorage();
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

  public changeCartItemQuantity(productCart: CartProductDetailed): void {
    if (!this.authService.isAuthenticated()) {
      const cartItems: SimpleCartProduct[] =
        this.getCartItemsFromLocalStorage();
      const product = cartItems.find(
        (product) => product.id === productCart.id
      );
      if (product) {
        product.quantity = Number(productCart.quantity);
        localStorage.setItem('CartItems', JSON.stringify(cartItems));
      } else {
        window.alert('Product not found in cart!');
      }
    } else {
      window.alert('This logic is not implemented yet');
    }
  }

  public removeCartItem(cartProduct: CartProductDetailed): void {
    if (!this.authService.isAuthenticated()) {
      const cartItems: SimpleCartProduct[] =
        this.getCartItemsFromLocalStorage();
      const product = cartItems.find(
        (product) => product.id === cartProduct.id
      );
      if (product) {
        cartItems.splice(cartItems.indexOf(product), 1);
        localStorage.setItem('CartItems', JSON.stringify(cartItems));
      } else {
        window.alert('Product not found in cart!');
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

  public getTotalPriceOfCart(cartProducts: CartProductDetailed[]): number {
    let totalPrice = 0;
    cartProducts.forEach((product) => {
      if (product.totalPrice) {
        totalPrice += Number(product.totalPrice);
      } else {
        totalPrice += product.price * product.quantity;
      }
    });
    return totalPrice;
  }
}
