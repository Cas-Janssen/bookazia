import { Component, inject, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../../../models/Product';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { CategoryDetails } from '../../../models/CategoryDetails';
import { ProductItemComponent } from './product-item/product-item.component';
import { Subject, takeUntil, finalize } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  templateUrl: './product-wrapper.component.html',
  styleUrls: ['./product-wrapper.component.scss'],
  imports: [ProductItemComponent, TranslatePipe],
})
export class ProductWrapperComponent implements OnInit, OnDestroy {
  public products: Product[] | null = null;
  public isLoading: boolean = true;
  private destroy$: Subject<void> = new Subject<void>();

  private productService: ProductService = inject(ProductService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private categoryService: CategoryService = inject(CategoryService);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.isLoading = true;
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
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (categoryDetails: CategoryDetails) => {
          this.products = categoryDetails.products;
        },
        error: (err) => {
          console.error(err);
          this.products = [];
        },
      });
  }

  private fetchProductsBySearchQuery(searchQuery: string): void {
    this.productService
      .searchProducts(searchQuery)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          console.error(err);
          this.products = [];
        },
      });
  }

  private fetchAllProducts(): void {
    this.productService
      .getAllProducts()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          console.error(err);
          this.products = [];
        },
      });
  }

  protected goToHome(): void {
    this.router.navigate(['/home']);
  }

  protected browseAllBooks(): void {
    this.router.navigate(['/books']);
  }
}
