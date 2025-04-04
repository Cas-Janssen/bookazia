import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { ProductCart } from '../../models/ProductCart';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-card',
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  private productService: ProductService = inject(ProductService);
  private cartService: CartService = inject(CartService);
  private orderService: OrderService = inject(OrderService);
  private destroy$ = new Subject<void>();
  public productCart: ProductCart[] = [];
  public totalPrice: number = 0;

  ngOnInit(): void {
    this.loadProducts();
  }
  private loadProducts(): ProductCart[] {
    const productMap: Map<number, number> | null = this.mapProducts();
    if (productMap != null) {
      productMap.forEach((quantity, id) => {
        this.productService
          .getProductById(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (product) => {
              if (quantity > 10) {
                quantity == 10;
              }
              const totalPrice: string = (product.price * quantity).toFixed(2);

              const productCart: ProductCart = {
                id: product.id,
                name: product.title,
                coverImgUrl: product.coverImgUrl,
                price: product.price,
                quantity: quantity,
                totalPrice: totalPrice,
                stock: product.stock,
              };
              this.productCart.push(productCart);
            },
            error: (err) => {
              console.log(err);
            },
          });
      });
    }
    return this.productCart;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private mapProducts(): Map<number, number> | null {
    const cartItems = this.cartService.getCartItems();
    const productMap = new Map<number, number>();
    if (cartItems) {
      cartItems.forEach((item) => {
        if (productMap.has(item.id)) {
          if (item.quantity != null) {
            var quantity: number = productMap.get(item.id)! + item.quantity;
            if (quantity > 10) {
              quantity == 10;
            }
            productMap.set(item.id, quantity);
          }
        } else {
          if (item.quantity != null) {
            if (item.quantity > 10) {
              quantity = 10;
            } else {
              quantity = item.quantity;
            }
            productMap.set(item.id, quantity);
          }
        }
      });
      return productMap;
    } else return null;
  }

  protected updateTotalPrice(product: ProductCart): void {
    product.totalPrice = (product.quantity * product.price).toFixed(2);
    this.cartService.changeCartItemQuantity(product);
  }
  protected clearCartItems(): void {
    this.cartService.clearCartItems();
    this.productCart = [];
  }

  protected placeOrder(): void {
    if (this.productCart.length === 0) {
      window.alert(
        'Your cart is empty! Please add items to your cart before checking out.'
      );
      return;
    }
    this.orderService.placeOrder(this.productCart);
  }
  protected getQuantityArray(stock: number): number[] {
    const amount = Array.from({ length: stock }, (_, i) => i + 1);
    if (amount.length > 10) {
      return amount.slice(0, 10);
    }
    return amount;
  }
}
