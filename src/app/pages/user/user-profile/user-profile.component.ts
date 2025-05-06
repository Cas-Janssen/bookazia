import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '../../../services/user.service';
import { UserInfo } from '../../../models/UserInfo';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);

  protected userDetails: UserInfo | null = null;
  protected loading = true;

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.loading = true;
    this.userService.getUserDetails().subscribe({
      next: (user) => {
        this.userDetails = user;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user details:', error);
        this.loading = false;
      },
    });
  }

  hasAddress(): boolean {
    return !!(
      this.userDetails &&
      (this.userDetails.address ||
        this.userDetails.city ||
        this.userDetails.postalCode)
    );
  }

  getFullName(): string {
    if (!this.userDetails) return '';

    const parts = [
      this.userDetails.firstName || '',
      this.userDetails.middleName || '',
      this.userDetails.lastName || '',
    ];

    return parts.filter((part) => part.trim() !== '').join(' ') || 'N/A';
  }

  navigateToEdit(): void {
    this.router.navigate(['/profile/edit']);
  }

  navigateToOrders(): void {
    this.router.navigate(['/profile/orders']);
  }
}
