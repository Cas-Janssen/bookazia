import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SearchFiltersComponent } from './search-filters/search-filters.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [SearchFiltersComponent, NgIf, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected search_query: string = '';
  private router = inject(Router);
  public isLoggedIn: boolean = false;
  private authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.authService.currentLoginStatus.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  public onLogout(): void {
    this.authService.logout();
  }

  public goToMenu(path: string): void {
    this.router.navigate([path]);
  }

  public navigateFromQuery(query: string): void {
    this.goToMenu('search/' + query);
    this.search_query = '';
  }
}
