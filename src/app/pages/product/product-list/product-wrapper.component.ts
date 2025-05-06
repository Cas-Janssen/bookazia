import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Product } from '../../../models/Product';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { CategoryDetails } from '../../../models/CategoryDetails';
import { ProductItemComponent } from './product-item/product-item.component';
import { Subject, takeUntil } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  templateUrl: './product-wrapper.component.html',
  styleUrls: ['./product-wrapper.component.scss'],
  imports: [NgFor, ProductItemComponent, NgIf, TranslatePipe],
})
export class ProductWrapperComponent implements OnInit, OnDestroy {
  public products: Product[] | null = [];
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
        } else if (params['searchquery']) {
          if (params['searchquery'] === '*') {
            this.fetchAllProducts();
            return;
          }
          this.fetchProductsBySearchQuery(params['searchquery']);
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
          this.products = categoryDetails.products;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  private fetchProductsBySearchQuery(searchQuery: string): void {
    this.productService
      .searchProducts(searchQuery)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  private fetchAllProducts(): void {
    this.productService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          console.error(err);
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

  protected goToHome(): void {
    this.router.navigate(['/home']);
  }

  protected browseAllBooks(): void {
    this.router.navigate(['/books']);
  }
}
