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
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  private authService: AuthService = inject(AuthService);
  private productService: ProductService = inject(ProductService);
  private httpClient: HttpClient = inject(HttpClient);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private translate: TranslateService = inject(TranslateService);
  private apiLink: String = environment.apiUrl;
  private destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private showSnackBar(
    messageKey: string,
    panelClass: string = 'info-snackbar'
  ): void {
    const message = this.translate.instant(messageKey);
    this.snackBar.open(message, 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 3000,
      panelClass: [panelClass],
    });
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
        this.productService.getProductById(product.productId).pipe(
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
      this.showSnackBar('CART.ITEM_NOT_AVAILABLE', 'error-snackbar');
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
          this.showSnackBar('CART.ITEM_ALREADY_IN_CART', 'info-snackbar');
          return;
        }
        this.httpClient
          .put(this.apiLink + '/user/cart/update', {
            productId: product.id,
            quantity: 1,
          })
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.showSnackBar('CART.ITEM_ADDED', 'success-snackbar');
            },
            error: () => {
              this.showSnackBar('CART.ERROR_ADDING_ITEM', 'error-snackbar');
            },
          });
      },
      error: () => {
        this.showSnackBar('CART.ERROR_FETCHING_CART', 'error-snackbar');
      },
    });
  }

  private addCartItemToLocalStorage(product: Product): void {
    const cartItems: SimpleCartProduct[] = this.getCartItemsFromLocalStorage();
    const productAlreadyInCart = cartItems.find(
      (cartProduct) => cartProduct.productId === product.id
    );
    if (productAlreadyInCart) {
      this.showSnackBar('Product already in cart!', 'info-snackbar');
      return;
    } else {
      cartItems.push({ productId: product.id, quantity: 1 });
    }
    localStorage.setItem('CartItems', JSON.stringify(cartItems));
    this.showSnackBar('Product added to cart!', 'success-snackbar');
  }

  public changeCartItemQuantity(productCart: CartProductDetailed): void {
    if (!this.authService.isAuthenticated()) {
      const cartItems: SimpleCartProduct[] =
        this.getCartItemsFromLocalStorage();
      const product = cartItems.find(
        (product) => product.productId === productCart.id
      );
      if (product) {
        product.quantity = Number(productCart.quantity);
        localStorage.setItem('CartItems', JSON.stringify(cartItems));
        this.showSnackBar('CART.ITEM_QUANTITY_UPDATED', 'success-snackbar');
      } else {
        this.showSnackBar('CART.ITEM_NOT_FOUND', 'error-snackbar');
      }
    } else {
      this.httpClient
        .put(this.apiLink + '/user/cart/update', {
          productId: productCart.id,
          quantity: productCart.quantity,
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.showSnackBar('CART.ITEM_QUANTITY_UPDATED', 'success-snackbar');
          },
          error: () => {
            this.showSnackBar('CART.ERROR_UPDATING_ITEM', 'error-snackbar');
          },
        });
    }
  }

  public removeCartItem(cartProduct: CartProductDetailed): void {
    if (!this.authService.isAuthenticated()) {
      const cartItems: SimpleCartProduct[] =
        this.getCartItemsFromLocalStorage();
      const product = cartItems.find(
        (product) => product.productId === cartProduct.id
      );
      if (product) {
        cartItems.splice(cartItems.indexOf(product), 1);
        localStorage.setItem('CartItems', JSON.stringify(cartItems));
        this.showSnackBar('CART.ITEM_REMOVED', 'success-snackbar');
      } else {
        this.showSnackBar('CART.ITEM_NOT_FOUND', 'error-snackbar');
      }
      return;
    } else {
      this.httpClient
        .delete<void>(`${this.apiLink}/user/cart/remove/${cartProduct.id}`)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.showSnackBar('CART.ITEM_REMOVED', 'success-snackbar');
          },
          error: () => {
            this.showSnackBar('CART.ERROR_REMOVING_ITEM', 'error-snackbar');
          },
        });
      return;
    }
  }

  public clearCartItems(): void {
    if (!this.authService.isAuthenticated()) {
      localStorage.removeItem('CartItems');
      this.showSnackBar('CART.CART_CLEARED', 'success-snackbar');
    } else {
      this.httpClient
        .delete<void>(this.apiLink + '/user/cart/clear')
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.showSnackBar('CART.CART_CLEARED', 'success-snackbar');
          },
          error: () => {
            this.showSnackBar('CART.ERROR_REMOVING_ITEM', 'error-snackbar');
          },
        });
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
