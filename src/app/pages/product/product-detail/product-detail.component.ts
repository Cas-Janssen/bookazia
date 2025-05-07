import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../models/Product';
import { ProductService } from '../../../services/product.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Category } from '../../../models/Category';

@Component({
  selector: 'app-product-detail',
  imports: [NgFor, NgClass, NgIf, TranslatePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  public book?: Product;
  public bookTitle!: string;
  public isbn!: string;
  public bookId!: number;
  public errorMessage?: string;
  private destroy$ = new Subject<void>();
  private authService: AuthService = inject(AuthService);
  private productService: ProductService = inject(ProductService);
  private cartService: CartService = inject(CartService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private translateService: TranslateService = inject(TranslateService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.bookId = parseInt(id);
        this.loadBookDetails(this.bookId);
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadBookDetails(bookId: number): void {
    this.productService
      .getProductById(bookId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (book) => {
          this.bookTitle = book.title.replaceAll(' ', '-').toLowerCase();
          this.isbn = book.isbn;
          this.book = book;
          this.router.navigate(
            ['/products', this.bookId, `${this.bookTitle}-${this.isbn}`],
            { replaceUrl: true }
          );
        },
        error: (err) => {
          this.router.navigate(['/not-found']);
        },
      });
  }

  public getProductById(id: number): void {
    this.productService.getProductById(id).subscribe((product) => {
      this.book = product;
    });
  }

  protected addToCart(product: Product): void {
    if (!product.enabled) {
      window.alert('This product is not available for purchase!');
      return;
    }
    this.cartService.addCartItem(product);
  }

  protected addToFavorites(product: Product): void {
    if (!this.authService.isAuthenticated()) {
      window.alert('Log in to add a product to favorites!');
      return;
    }
    console.log(`Added ${product.title} to favorites`);
  }
  getLocalizedDescription(): string {
    if (!this.book) return '';

    const currentLang = this.translateService.currentLang;

    if (currentLang === 'nl' && this.book.descriptionNl) {
      return this.book.descriptionNl;
    } else {
      return this.book.descriptionEn || '';
    }
  }
  getLocalizedCategoryName(category: Category): string {
    const currentLang = this.translateService.currentLang;
    if (currentLang === 'nl' && category.nameNl) {
      return category.nameNl;
    } else {
      return category.nameEn || '';
    }
  }
}
