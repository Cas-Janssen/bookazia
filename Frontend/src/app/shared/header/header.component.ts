import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SearchFiltersComponent } from './search-filters/search-filters.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { LanguageSwitchComponent } from './language-switch/language-switch.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ProfileOptionsComponent } from './profile-options/profile-options.component';

@Component({
  selector: 'app-header',
  imports: [
    SearchFiltersComponent,
    FormsModule,
    LanguageSwitchComponent,
    TranslatePipe,
    ProfileOptionsComponent
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  protected searchQuery: string = '';
  private router = inject(Router);
  private destroy$: Subject<void> = new Subject<void>();
  public isLoggedIn: boolean = false;
  protected isProfileMenuOpen: boolean = false;
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.currentLoginStatus
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => {
        this.isLoggedIn = status;
        if (!status) {
          this.isProfileMenuOpen = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected goToMenu(path: string): void {
    this.router.navigate([path]);
  }

  protected navigateFromQuery(
    query: string,
    inputElement: HTMLInputElement
  ): void {
    inputElement.blur();
    if (query == '') {
      query = '*';
    }

    this.goToMenu('search/' + query);
    this.searchQuery = '';
  }

  protected toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  protected closeProfileMenu(): void {
    this.isProfileMenuOpen = false;
  }
}
