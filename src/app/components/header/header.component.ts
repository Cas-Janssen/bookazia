import { Component } from '@angular/core';
import { SearchFiltersComponent } from './search-filters/search-filters.component';

@Component({
  selector: 'app-header',
  imports: [SearchFiltersComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  goToMainMenu(): void {
    // Navigate to main menu
    console.log('Going to main menu');
  }
}
