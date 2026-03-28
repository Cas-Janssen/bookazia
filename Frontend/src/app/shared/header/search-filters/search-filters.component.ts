import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgFor } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/Category';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search-filters',
  imports: [NgFor, TranslatePipe],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.scss',
})
export class SearchFiltersComponent implements OnInit, OnDestroy {
  private categoryService: CategoryService = inject(CategoryService);
  private translateService: TranslateService = inject(TranslateService);
  private router: Router = inject(Router);
  private destroy$: Subject<void> = new Subject<void>();
  public categories: Category[] = [];
  protected all: string = '';
  protected menuOpen: boolean = false;

  protected isMobileView: boolean = false;

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
    this.menuOpen = false;
    this.router.navigate(['/books/', categoryName.toLowerCase()]);
  }

  ngOnInit(): void {
    this.getCategories();
    this.menuOpen = false;
    this.checkViewport();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  @HostListener('window:resize')
  onResize(): void {
    this.checkViewport();
    if (!this.isMobileView) {
      this.menuOpen = false;
    }
  }

  private checkViewport(): void {
    this.isMobileView = window.innerWidth <= 576;
  }

  protected getLocalizedCategoryName(category: Category): string {
    const currentLang = this.translateService.currentLang;
    if (currentLang === 'nl' && category.nameNl) {
      return category.nameNl;
    } else {
      return category.nameEn || '';
    }
  }
}
