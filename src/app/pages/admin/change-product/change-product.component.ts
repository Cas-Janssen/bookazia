import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { AuthorService } from '../../../services/author.service';
import { PublisherService } from '../../../services/publisher.service';
import { Subject, takeUntil, finalize } from 'rxjs';
import { Category } from '../../../models/Category';
import { Publisher } from '../../../models/Publisher';
import { Author } from '../../../models/Author';
import { AddProduct } from '../../../models/AddProduct';
import { Product } from '../../../models/Product';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe, FormsModule],
  templateUrl: './change-product.component.html',
  styleUrl: './change-product.component.scss',
})
export class ChangeProductComponent implements OnInit, OnDestroy {
  protected productForm!: FormGroup;
  protected productId!: number;
  protected product: Product | null = null;
  protected submitted = false;
  protected success = false;
  protected error: string | null = null;
  protected loading = true;
  protected coverImagePreview: string | null = null;
  protected categories: Category[] = [];
  protected authors: Author[] = [];
  protected publishers: Publisher[] = [];
  protected filteredAuthors: Author[] = [];
  protected authorSearchQuery = '';
  protected categorySearchQuery = '';
  protected filteredCategories: Category[] = [];
  protected selectedCategories: number[] = [];
  protected selectedAuthors: number[] = [];
  protected languages: string[] = [
    'dutch',
    'english',
    'french',
    'german',
    'spanish',
    'italian',
    'portuguese',
    'chinese',
    'japanese',
    'russian',
    'arabic',
  ];
  protected maxDate: string = '';
  private destroy$ = new Subject<void>();

  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private productService: ProductService = inject(ProductService);
  private categoryService: CategoryService = inject(CategoryService);
  private authorService: AuthorService = inject(AuthorService);
  private publisherService: PublisherService = inject(PublisherService);
  private authService: AuthService = inject(AuthService);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.authService.isAdminUser().subscribe((isAdmin) => {
      if (!isAdmin) {
        this.router.navigate(['/']);
      }
    });

    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];

    this.initForm();
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.productId = +params['id'];
      if (isNaN(this.productId)) {
        this.error = 'Invalid product ID';
        this.loading = false;
        return;
      }

      this.loadProduct();
      this.loadCategories();
      this.loadAuthors();
      this.loadPublishers();
    });

    this.productForm
      .get('coverImgUrl')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((url) => {
        if (url && this.isValidUrl(url)) {
          this.coverImagePreview = url;
        } else {
          this.coverImagePreview = null;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      isbn: [
        '',
        [Validators.required, Validators.pattern(/^(?:\d{10}|\d{13})$/)],
      ],
      descriptionEn: ['', [Validators.required, Validators.minLength(20)]],
      descriptionNl: ['', [Validators.required, Validators.minLength(20)]],
      coverImgUrl: [
        '',
        [Validators.required, this.coverImgUrlValidator.bind(this)],
      ],
      pages: ['', [Validators.required, Validators.min(1)]],
      publicationDate: ['', [Validators.required, this.noFutureDateValidator]],
      originalLanguage: ['', [Validators.required]],
      publisherId: ['', [Validators.required]],
      isEnabled: [true],
    });
  }

  get f() {
    return this.productForm.controls;
  }

  private loadProduct(): void {
    this.productService
      .getProductById(this.productId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (product) => {
          this.product = product;
          this.populateForm(product);
          this.coverImagePreview = product.coverImgUrl;
        },
        error: (err) => {
          console.error('Error loading product', err);
          this.error = 'Failed to load product details';
        },
      });
  }

  private populateForm(product: Product): void {
    const publicationDate = product.publicationDate
      ? product.publicationDate.split('T')[0]
      : '';

    this.productForm.patchValue({
      title: product.title,
      price: product.price,
      stock: product.stock,
      isbn: product.isbn,
      descriptionEn: product.descriptionEn,
      descriptionNl: product.descriptionNl,
      coverImgUrl: product.coverImgUrl,
      pages: product.pages,
      publicationDate: publicationDate,
      originalLanguage: product.originalLanguage,
      publisherId: product.publisher.id,
      isEnabled: product.enabled,
    });

    this.selectedCategories = product.categories.map((category) => category.id);
    this.selectedAuthors = product.authors.map((author) => author.id);
  }

  private loadCategories(): void {
    this.categoryService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          this.filteredCategories = categories;
        },
        error: (err) => {
          console.error('Error loading categories', err);
          this.error = 'Failed to load categories';
        },
      });
  }

  private loadAuthors(): void {
    this.authorService
      .getAllAuthors()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (authors) => {
          this.authors = authors;
          this.filteredAuthors = authors;
        },
        error: (err) => {
          console.error('Error loading authors', err);
          this.error = 'Failed to load authors';
        },
      });
  }

  private loadPublishers(): void {
    this.publisherService
      .getAllPublishers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (publishers) => {
          this.publishers = publishers;
        },
        error: (err) => {
          console.error('Error loading publishers', err);
          this.error = 'Failed to load publishers';
        },
      });
  }

  protected filterAuthors(): void {
    const query = this.authorSearchQuery.toLowerCase();
    if (!query) {
      this.filteredAuthors = this.authors;
      return;
    }

    this.filteredAuthors = this.authors.filter(
      (author) =>
        author.firstName.toLowerCase().includes(query) ||
        author.lastName.toLowerCase().includes(query)
    );
  }

  protected filterCategories(): void {
    const query = this.categorySearchQuery.toLowerCase();
    if (!query) {
      this.filteredCategories = this.categories;
      return;
    }

    this.filteredCategories = this.categories.filter(
      (category) =>
        category.nameEn.toLowerCase().includes(query) ||
        (category.nameNl && category.nameNl.toLowerCase().includes(query))
    );
  }

  protected onCategoryChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const categoryId = Number(checkbox.value);

    if (checkbox.checked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter(
        (id) => id !== categoryId
      );
    }
  }

  protected onAuthorChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const authorId = Number(checkbox.value);

    if (checkbox.checked) {
      this.selectedAuthors.push(authorId);
    } else {
      this.selectedAuthors = this.selectedAuthors.filter(
        (id) => id !== authorId
      );
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  protected onSubmit(): void {
    this.submitted = true;
    this.error = null;

    if (this.productForm.invalid) {
      this.scrollToError();
      return;
    }

    if (this.selectedCategories.length === 0) {
      this.error = 'Please select at least one category';
      this.scrollToError();
      return;
    }

    if (this.selectedAuthors.length === 0) {
      this.error = 'Please select at least one author';
      this.scrollToError();
      return;
    }

    this.loading = true;

    const productData: AddProduct = {
      title: this.productForm.value.title,
      price: Number(this.productForm.value.price),
      stock: Number(this.productForm.value.stock),
      isbn: this.productForm.value.isbn,
      descriptionEn: this.productForm.value.descriptionEn,
      descriptionNl: this.productForm.value.descriptionNl,
      coverImgUrl: this.productForm.value.coverImgUrl,
      pages: Number(this.productForm.value.pages),
      publicationDate: this.formatDateForApi(
        this.productForm.value.publicationDate
      ),
      originalLanguage: this.productForm.value.originalLanguage,
      categoryIds: this.selectedCategories,
      authorIds: this.selectedAuthors,
      publisherId: Number(this.productForm.value.publisherId),
      isEnabled: this.productForm.value.isEnabled,
    };

    this.productService
      .updateProduct(productData, this.productId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (response) => {
          this.success = true;
          this.snackBar.open('Product updated successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['success-snackbar'],
          });
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          console.error('Error updating product', err);
          this.error = err.error?.message || 'Failed to update product';
          this.scrollToError();
        },
      });
  }

  private scrollToError(): void {
    setTimeout(() => {
      const generalError = document.querySelector('.alert-danger');
      if (generalError) {
        generalError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      const errorMessages = document.querySelectorAll(
        '.invalid-feedback:not([style*="display: none"])'
      );

      const invalidControls = document.querySelectorAll('.ng-invalid');

      if (errorMessages.length > 0) {
        const firstError = errorMessages[0];
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const errorParent = firstError.closest('.form-group');
        if (errorParent) {
          const input = errorParent.querySelector('input, select, textarea');
          if (input) {
            (
              input as
                | HTMLInputElement
                | HTMLSelectElement
                | HTMLTextAreaElement
            ).focus();
          }
        }
        return;
      }

      if (invalidControls.length > 0) {
        const firstInvalidControl = invalidControls[0];
        firstInvalidControl.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });

        if (
          firstInvalidControl instanceof HTMLInputElement ||
          firstInvalidControl instanceof HTMLSelectElement ||
          firstInvalidControl instanceof HTMLTextAreaElement
        ) {
          firstInvalidControl.focus();
        }
      }
    }, 100);
  }

  private formatDateForApi(date: string): string {
    if (!date) return '';

    try {
      const dateObj = new Date(date);
      return dateObj.toISOString().split('T')[0];
    } catch (err) {
      console.error('Date format error:', err);
      return date;
    }
  }

  protected goBack(): void {
    this.router.navigate(['/admin']);
  }

  private noFutureDateValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const inputDate = new Date(control.value);
    inputDate.setHours(0, 0, 0, 0);

    if (inputDate > today) {
      return { futureDate: true };
    }

    return null;
  }

  private coverImgUrlValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const url = control.value;
    if (!url) {
      return null;
    }

    const standardImagePattern = /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/;

    const isGoogleBooksUrl =
      url.includes('books.google.com') &&
      url.includes('content') &&
      url.includes('img=1') &&
      url.includes('imgtk=');

    if (standardImagePattern.test(url) || isGoogleBooksUrl) {
      return null;
    }

    return { invalidUrl: true };
  }
}
