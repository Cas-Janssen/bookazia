import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../../models/Product';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
  imports: [NgClass, TranslatePipe],
})
export class ProductItemComponent {
  @Input() product!: Product;
  private router: Router = inject(Router);
  private cartService: CartService = inject(CartService);

  addToCart(product: Product): void {
    this.cartService.addCartItem(product);
  }
  protected goToProductDetails(product: Product): void {
    this.router.navigate([
      `/products/${product.id}/${product.title
        .replaceAll(' ', '-')
        .toLowerCase()}-${product.isbn}`,
    ]);
  }
}
