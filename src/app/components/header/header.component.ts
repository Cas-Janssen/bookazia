import { Component, inject } from '@angular/core';
import { SearchFiltersComponent } from './search-filters/search-filters.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [SearchFiltersComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);

  goToMenu(path: string): void {
    this.router.navigate([path]);
  }

  navigateFromInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const path = inputElement.value.trim();
    if (path) {
      this.goToMenu('search/' + path);
      inputElement.value = '';
    }
  }
}
