import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Product } from '../../../models/Product';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { CategoryDetails } from '../../../models/CategoryDetails';
import { ProductItemComponent } from './product-item/product-item.component';
import { Subject, takeUntil } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product-wrapper.component.html',
  styleUrls: ['./product-wrapper.component.css'],
  imports: [NgFor, ProductItemComponent, NgIf],
})
export class ProductWrapperComponent implements OnInit, OnDestroy {
  public products: Product[] | null = [];
  protected errorMessage: string | null = null;
  private destroy$: Subject<void> = new Subject<void>();

  private productService: ProductService = inject(ProductService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private categoryService: CategoryService = inject(CategoryService);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        if (params['categoryname']) {
          this.fetchProductsByCategory(params['categoryname']);
        } else {
          this.fetchAllProducts();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private fetchProductsByCategory(categoryName: string): void {
    this.categoryService
      .getCategoryDetails(categoryName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categoryDetails: CategoryDetails) => {
          this.errorMessage = null;
          this.products = categoryDetails.products;
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
  }
  private fetchProductsBySearchQuery(searchQuery: string): void {}

  private fetchAllProducts(): void {
    this.productService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.errorMessage = null;
          this.products = data;
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
  }
  public goToProductDetails(product: Product): void {
    this.router.navigate([
      `/products/${product.id}/${product.title
        .replaceAll(' ', '-')
        .toLowerCase()}-${product.isbn}`,
    ]);
  }
}
