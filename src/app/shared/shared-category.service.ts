import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class SharedCategoryService {
  private selectedCategorySubject = new BehaviorSubject<Category | null>(null);
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  constructor() {
    const sessionStorageCategoryValue = this.getSessionStorageValue();
    if (sessionStorageCategoryValue != null) {
      this.selectedCategorySubject.next(sessionStorageCategoryValue);
    }
  }

  public getSessionStorageValue(): Category | null {
    const sessionStoredValue: string | null =
      sessionStorage.getItem('selectedCategory');
    if (sessionStoredValue != null) {
      const category = JSON.parse(sessionStoredValue);
      return category;
    } else {
      return null;
    }
  }
  public setSelectedCategory(category: Category): void {
    sessionStorage.setItem('selectedCategory', JSON.stringify(category));
    this.selectedCategorySubject.next(category);
  }

  public clearSelectedCategory(): void {
    sessionStorage.removeItem('selectedCategory');
    this.selectedCategorySubject.next(null);
  }

  public getSelectedCategory(): Category | null {
    const sessionStorageCategory = this.getSessionStorageValue();
    if (sessionStorageCategory != null) {
      return sessionStorageCategory;
    } else {
      return this.selectedCategorySubject.value;
    }
  }
}
