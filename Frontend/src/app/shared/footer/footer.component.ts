import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  protected currentYear: number;
  private router: Router = inject(Router);

  constructor() {
    this.currentYear = new Date().getFullYear();
  }

  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }
}
