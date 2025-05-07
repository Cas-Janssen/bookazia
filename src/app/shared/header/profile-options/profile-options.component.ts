import {
  Component,
  Output,
  EventEmitter,
  HostListener,
  Input,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-options',
  imports: [NgIf, TranslatePipe],
  templateUrl: './profile-options.component.html',
  styleUrl: './profile-options.component.scss',
})
export class ProfileOptionsComponent {
  @Input() isOpen: boolean = false;
  @Output() logoutEvent = new EventEmitter<void>();
  @Output() closeMenu = new EventEmitter<void>();
  private router: Router = inject(Router);

  goToAdminMenu(): void {
    this.router.navigate(['/admin']);
    this.closeMenu.emit();
  }

  goToOrders(): void {
    this.router.navigate(['/profile/orders']);
    this.closeMenu.emit();
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
    this.closeMenu.emit();
  }

  goToEditProfile(): void {
    this.router.navigate(['/profile/edit']);
    this.closeMenu.emit();
  }

  logout(): void {
    this.logoutEvent.emit();
    this.closeMenu.emit();
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    if (!(event.target as HTMLElement).closest('.profile-menu-container')) {
      this.closeMenu.emit();
    }
  }
}
