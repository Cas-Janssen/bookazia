import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/Category';
import { Router } from '@angular/router';
import { SharedProductSearchService } from '../../../shared/shared-product-search.service';

@Component({
  selector: 'app-search-filters',
  imports: [NgFor],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.scss',
})
export class SearchFiltersComponent implements OnInit {
  private categoryService: CategoryService = inject(CategoryService);
  private router: Router = inject(Router);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private sharedProductSearchService: SharedProductSearchService = inject(
    SharedProductSearchService
  );
  public categories: Category[] = [];

  public getCategories(): void {
    const subscription = this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  public goToCategory(categoryName: string): void {
    this.setCategoryId(categoryName);
    this.router.navigate(['/books/', categoryName.toLowerCase()]);
  }

  private setCategoryId(categoryName: string): void {
    const category = this.categories.find(
      (category) => category.name.toLowerCase() === categoryName.toLowerCase()
    );
    if (category) {
      this.sharedProductSearchService.setSelectedCategory(category);
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
