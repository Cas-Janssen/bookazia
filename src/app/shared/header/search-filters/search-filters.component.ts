import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/Category';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-filters',
  imports: [NgFor],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.scss',
})
export class SearchFiltersComponent implements OnInit, OnDestroy {
  private categoryService: CategoryService = inject(CategoryService);
  private router: Router = inject(Router);
  private destroy$: Subject<void> = new Subject<void>();
  public categories: Category[] = [];
  protected all: string = '';
  protected menuOpen: boolean = false;

  protected toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  public getCategories(): void {
    this.categoryService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  public goToCategory(categoryName: string): void {
    this.router.navigate(['/books/', categoryName.toLowerCase()]);
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
