import {
  Component,
  inject,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SharedCategoryService } from '../../shared/shared-category.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../models/Product';
import { CategoryDetails } from '../../models/CategoryDetails';
import { ProductItemComponent } from './product-item/product-item.component';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product-wrapper.component.html',
  styleUrls: ['./product-wrapper.component.css'],
  imports: [NgFor, ProductItemComponent, NgIf],
})
export class ProductWrapperComponent implements OnInit, OnChanges, OnDestroy {
  public products: Product[] | null = [];
  protected errorMessage: string | null = null;
  private destroy$ = new Subject<void>();

  private productService: ProductService = inject(ProductService);
  private categoryService: CategoryService = inject(CategoryService);
  private router: Router = inject(Router);
  private sharedCategoryService: SharedCategoryService = inject(
    SharedCategoryService
  );
  private currentCategoryId: number | null = null;

  ngOnInit(): void {
    this.sharedCategoryService.selectedCategory$
      .pipe(takeUntil(this.destroy$))
      .subscribe((category) => {
        if (category) {
          if (category.id !== this.currentCategoryId) {
            this.currentCategoryId = category.id;
            this.fetchProductsByCategory(category.id);
          }
        } else {
          this.fetchAllProducts();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategory']) {
      const selectedCategory = this.sharedCategoryService.getSelectedCategory();
      if (selectedCategory != null) {
        this.fetchProductsByCategory(selectedCategory.id);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private fetchProductsByCategory(categoryId: number): void {
    this.categoryService
      .getCategoryDetails(categoryId)
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
      `/products/${product.title.replaceAll(' ', '-').toLowerCase()}-${
        product.isbn
      }/${product.id}`,
    ]);
  }
}
