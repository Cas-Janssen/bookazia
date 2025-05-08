import { Component, Input } from '@angular/core';
import { Product } from '../../../../models/Product';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
  imports: [NgIf, NgFor, NgClass],
})
export class ProductItemComponent {
  @Input() product!: Product;

  addToCart(product: Product): void {
    console.log(`Product added to cart: ${product.title}`);
    // Add logic to add the product to the shopping cart
  }
}
