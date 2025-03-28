import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductItemComponent } from './product-item/product-item.component';
@Component({
  selector: 'app-product',
  templateUrl: './product-wrapper.component.html',
  styleUrls: ['./product-wrapper.component.css'],
  imports: [NgFor, NgIf, ProductItemComponent],
})
export class ProductWrapperComponent implements OnInit {
  public products: any[] = [];
  protected errorMessage: string | null = null;

  constructor(private productService: ProductService) {}

  public ngOnInit(): void {
    this.refreshProducts();
  }
  protected refreshProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.errorMessage = null;
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
    });
  }
}
