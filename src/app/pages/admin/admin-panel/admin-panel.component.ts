import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';
import { Product } from '../../../models/Product';
import { Subject, takeUntil, finalize } from 'rxjs';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-admin-panel',
  imports: [
    CommonModule,
    RouterModule,
    TranslatePipe,
    FormsModule,
    ConfirmationDialogComponent,
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;
  error: string | null = null;
  success: string | null = null;
  searchTerm = '';
  filterStatus = 'all';

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  sortField = 'title';
  sortDirection = 'asc';

  showConfirmDialog = false;
  confirmAction: () => void = () => {};
  confirmMessage = '';
  confirmTitle = '';

  selectedProduct: Product | null = null;
  private productService: ProductService = inject(ProductService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.authService.isAdminUser().subscribe((isAdmin) => {
      if (!isAdmin) {
        this.router.navigate(['/']);
      }
    });
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadProducts(): void {
    this.loading = true;
    this.error = null;

    this.productService
      .getAllProducts()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (products) => {
          this.products = products;
          this.applyFilters();
          this.calculateTotalPages();
        },
        error: (err) => {
          console.error('Error loading products', err);
          this.error = 'Failed to load products. Please try again.';
        },
      });
  }

  private applyFilters(): void {
    let filtered = [...this.products];

    if (this.searchTerm.trim()) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(search) ||
          product.isbn.toLowerCase().includes(search) ||
          product.authors.some((author) =>
            `${author.firstName} ${author.lastName}`
              .toLowerCase()
              .includes(search)
          )
      );
    }

    if (this.filterStatus !== 'all') {
      const isEnabled = this.filterStatus === 'active';
      filtered = filtered.filter((product) => product.enabled === isEnabled);
    }

    filtered = this.sortProducts(filtered);

    this.filteredProducts = filtered;
    this.calculateTotalPages();
  }

  private sortProducts(products: Product[]): Product[] {
    return products.sort((a, b) => {
      let comparison = 0;

      switch (this.sortField) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'stock':
          comparison = a.stock - b.stock;
          break;
        case 'publisher':
          comparison = a.publisher.firstName.localeCompare(
            b.publisher.firstName
          );
          break;
        default:
          comparison = 0;
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  protected onSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.applyFilters();
  }

  protected getSortIcon(field: string): string {
    if (this.sortField !== field) {
      return 'fa-sort';
    }
    return this.sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }

  private calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.currentPage = Math.max(1, this.totalPages);
    }
  }

  protected getCurrentPageProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(startIndex, startIndex + this.pageSize);
  }

  protected onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  protected onFilterChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  protected previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  protected nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  protected goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  protected getPageNumbers(): number[] {
    const pages = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxPagesToShow / 2)
    );
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  protected addProduct(): void {
    this.router.navigate(['/admin/add-product']);
  }

  protected editProduct(product: Product): void {
    this.router.navigate(['/admin/edit-product', product.id]);
  }

  protected toggleProductStatus(product: Product): void {
    const newStatus = !product.enabled;
    const action = newStatus ? 'activate' : 'deactivate';

    this.selectedProduct = product;
    this.confirmTitle = newStatus
      ? 'Make Product Visible'
      : 'Hide Product from Store';

    this.confirmMessage = newStatus
      ? `This will make "${product.title}" visible to customers. Do you want to proceed?`
      : `This will hide "${product.title}" from the store. Customers will no longer be able to see or purchase this book. Do you want to proceed?`;

    this.confirmAction = () => this.updateProductStatus(product.id, newStatus);
    this.showConfirmDialog = true;
  }

  //TODO add translations for the menu.
  private updateProductStatus(productId: number, isEnabled: boolean): void {
    if (isEnabled) {
      this.productService
        .reactivateProduct(productId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.success = `Product ${
              isEnabled ? 'activated' : 'deactivated'
            } successfully.`;
            this.loadProducts();
          },
          error: (err) => {
            console.error('Error updating product status', err);
            this.error = 'Failed to update product status. Please try again.';
          },
        });
    } else {
      this.productService
        .deleteProduct(productId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.success = `Product ${
              isEnabled ? 'activated' : 'deactivated'
            } successfully.`;
            this.loadProducts();
          },
          error: (err) => {
            console.error('Error updating product status', err);
            this.error = 'Failed to update product status. Please try again.';
          },
        });
    }
  }

  protected closeConfirmDialog(confirmed: boolean): void {
    this.showConfirmDialog = false;

    if (confirmed) {
      this.confirmAction();
    }

    this.selectedProduct = null;
  }

  protected navigateToUserManagement(): void {
    this.router.navigate(['/admin/users']);
  }
}
