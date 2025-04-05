import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SearchFiltersComponent } from './search-filters/search-filters.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [SearchFiltersComponent, NgIf, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  protected search_query: string = '';
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  public isLoggedIn: boolean = false;
  private authService: AuthService = inject(AuthService);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.authService.currentLoginStatus
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => {
        this.isLoggedIn = status;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onLogout(): void {
    this.authService.logout();
  }

  public goToMenu(path: string): void {
    this.router.navigate([path]);
  }

  public navigateFromQuery(
    query: string,
    inputElement: HTMLInputElement
  ): void {
    inputElement.blur();
    if (query == '') {
      query = '*';
    }
    if (query.includes(' ')) {
      query = query.replaceAll(/\s+/g, '-');
    }

    this.goToMenu('search/' + query);
    this.search_query = '';
  }
}
