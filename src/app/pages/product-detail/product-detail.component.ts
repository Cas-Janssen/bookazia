import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  public book?: Product;
  private productService: ProductService = inject(ProductService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  public bookTitle!: string;
  public isbn!: string;
  public bookId!: number;
  public errorMessage?: string;
  private destroy$ = new Subject<void>();

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

  loadBookDetails(bookId: number): void {
    this.productService
      .getProductById(bookId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (book) => {
          this.bookTitle = book.title.replaceAll(' ', '-').toLowerCase();
          this.isbn = book.isbn;
          this.book = book;
          this.router.navigate(
            ['/products', `${this.bookTitle}-${this.isbn}`, this.bookId],
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
    console.log(`Added ${product.title} to cart`);
  }
}
