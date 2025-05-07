import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile-options',
  imports: [NgIf, TranslatePipe],
  templateUrl: './profile-options.component.html',
  styleUrl: './profile-options.component.scss',
})
export class ProfileOptionsComponent {
  @Input() isOpen: boolean = false;
  @Output() closeMenu = new EventEmitter<void>();
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);

  protected goToAdminMenu(): void {
    this.router.navigate(['/admin']);
    this.closeMenu.emit();
  }

  protected goToOrders(): void {
    this.router.navigate(['/profile/orders']);
    this.closeMenu.emit();
  }

  protected goToProfile(): void {
    this.router.navigate(['/profile']);
    this.closeMenu.emit();
  }

  protected goToEditProfile(): void {
    this.router.navigate(['/profile/edit']);
    this.closeMenu.emit();
  }

  protected logout(): void {
    this.authService.logout();

    this.closeMenu.emit();
  }

  isAdmin(): boolean {
    return true;
  }
}
