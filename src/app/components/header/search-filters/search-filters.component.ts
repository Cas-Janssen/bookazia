import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/Category';

@Component({
  selector: 'app-search-filters',
  imports: [NgFor],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.scss',
})
export class SearchFiltersComponent implements OnInit {
  private categoryService: CategoryService = inject(CategoryService);
  public categories: Category[] = [];
  public getCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  ngOnInit(): void {
    this.getCategories();
  }
}
