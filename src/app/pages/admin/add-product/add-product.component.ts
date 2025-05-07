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
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { AuthorService } from '../../../services/author.service';
import { PublisherService } from '../../../services/publisher.service';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../../models/Category';
import { Publisher } from '../../../models/Publisher';
import { Author } from '../../../models/Author';
import { AddProduct } from '../../../models/AddProduct';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  submitted = false;
  success = false;
  error: string | null = null;
  coverImagePreview: string | null = null;
  categories: Category[] = [];
  authors: Author[] = [];
  publishers: Publisher[] = [];
  filteredAuthors: Author[] = [];
  authorSearchQuery = '';
  categorySearchQuery = '';
  filteredCategories: Category[] = [];
  selectedCategories: number[] = [];
  selectedAuthors: number[] = [];
  languages: string[] = [
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

  maxDate: string = '';
  private destroy$ = new Subject<void>();
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private productService: ProductService = inject(ProductService);
  private categoryService: CategoryService = inject(CategoryService);
  private authorService: AuthorService = inject(AuthorService);
  private publisherService: PublisherService = inject(PublisherService);
  private authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
    this.initForm();
    this.loadCategories();
    this.loadAuthors();
    this.loadPublishers();

    this.filteredCategories = this.categories;

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
        [
          Validators.required,
          Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i),
        ],
      ],
      publicationDate: ['', [Validators.required, this.noFutureDateValidator]],
      originalLanguage: ['', [Validators.required]],
      publisherId: ['', [Validators.required]],
    });
  }

  get f() {
    return this.productForm.controls;
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
      return;
    }

    if (this.selectedCategories.length === 0) {
      this.error = 'Please select at least one category';
      return;
    }

    if (this.selectedAuthors.length === 0) {
      this.error = 'Please select at least one author';
      return;
    }

    const productData: AddProduct = {
      title: this.productForm.value.title,
      price: Number(this.productForm.value.price),
      stock: Number(this.productForm.value.stock),
      isbn: this.productForm.value.isbn,
      descriptionEn: this.productForm.value.descriptionEn,
      descriptionNl: this.productForm.value.descriptionNl,
      coverImgUrl: this.productForm.value.coverImgUrl,
      publicationDate: this.formatDateForApi(
        this.productForm.value.publicationDate
      ),
      originalLanguage: this.productForm.value.originalLanguage,
      categoryIds: this.selectedCategories,
      authorIds: this.selectedAuthors,
      publisherId: Number(this.productForm.value.publisherId),
      isEnabled: true,
    };

    this.productService
      .addProduct(productData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.success = true;

          setTimeout(() => {
            this.router.navigate(['/admin/products']);
          }, 1500);
        },
        error: (err) => {
          console.error('Error creating product', err);
          this.error = err.error?.message || 'Failed to create product';
        },
      });
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
}
