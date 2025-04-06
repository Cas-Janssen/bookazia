import { inject, Injectable, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { CartProductDetailed } from '../models/CartProductDetailed';
import { SimpleCartProduct } from '../models/SimpleCartProduct';
import { Product } from '../models/Product';
import { ProductService } from './product.service';
import { forkJoin, map, Observable, Subject, takeUntil, of } from 'rxjs';
import { CartProduct } from '../models/CartProduct';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ShoppingCart } from '../models/ShoppingCart';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  private authService: AuthService = inject(AuthService);
  private productService: ProductService = inject(ProductService);
  private httpClient: HttpClient = inject(HttpClient);
  private apiLink: String = environment.apiUrl;
  public cartProducts: CartProduct[] = [];
  private destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getShoppingCartFromDatabase(): Observable<ShoppingCart> {
    const shoppingCart: Observable<ShoppingCart> =
      this.httpClient.get<ShoppingCart>(this.apiLink + '/user/cart');
    return shoppingCart;
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

  private addCartItemToDatabase(product: Product): void {
    const shoppingCart: Observable<ShoppingCart> =
      this.getShoppingCartFromDatabase();

    shoppingCart.pipe(takeUntil(this.destroy$)).subscribe({
      next: (cart) => {
        const cartItems = cart.cartItems.map((item) => item.product.id);
        if (cartItems.includes(product.id)) {
          window.alert('Product already in cart!');
          return;
        }
        this.httpClient
          .put(this.apiLink + '/user/cart/update', {
            productId: product.id,
            quantity: 1,
          })
          .pipe(takeUntil(this.destroy$))
          .subscribe({});
      },
      error: (error) => {
        console.error('Error fetching shopping cart:', error);
      },
    });
  }

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
      this.httpClient
        .put(this.apiLink + '/user/cart/update', {
          productId: productCart.id,
          quantity: productCart.quantity,
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            window.alert('Cart item updated:');
          },
          error: (error) => {
            window.alert('Error updating cart item. Please try again later.');
          },
        });
    }
  }

  public removeCartItem(cartProduct: CartProductDetailed): Observable<void> {
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
      return of();
    } else {
      return this.httpClient.delete<void>(
        `${this.apiLink}/user/cart/remove/${cartProduct.id}`
      );
    }
  }

  public clearCartItems(): void {
    if (!this.authService.isAuthenticated()) {
      localStorage.removeItem('CartItems');
    } else {
      this.httpClient
        .delete<void>(this.apiLink + '/user/cart/clear')
        .pipe(takeUntil(this.destroy$))
        .subscribe({});
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
