import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-product-item',
  imports: [NgFor, NgIf],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product!: Product;
}
