import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';

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
  protected isAdmin: boolean = false; // TODO: Implement admin check logic
  //Observable<boolean> = this.authService.isAdmin();

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
    window.alert('You have been logged out!');
    this.router.navigate(['/']);
    this.closeMenu.emit();
  }
}
