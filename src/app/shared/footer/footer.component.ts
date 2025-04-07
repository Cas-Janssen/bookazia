import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private router: Router = inject(Router);
  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }
}
