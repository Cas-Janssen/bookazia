import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { UserInfo } from '../../../models/UserInfo';
import { UserService } from '../../../services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../../models/User';
import { ResponseLogin } from '../../../models/ResponseLogin';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-profile-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './user-profile-edit.component.html',
  styleUrl: './user-profile-edit.component.scss',
})
export class UserProfileEditComponent implements OnInit, OnDestroy {
  protected firstName: string = '';
  protected middleName: string = '';
  protected lastName: string = '';
  protected email: string = '';
  protected phoneNumber: string = '';
  protected address: string = '';
  protected city: string = '';
  protected postalCode: string = '';
  protected password: string = '';
  private token: string | null = null;

  protected loading: boolean = true;
  protected success: boolean = false;
  protected error: string | null = null;
  protected submitted: boolean = false;
  protected isFormValid: boolean = true;

  private destroy$: Subject<void> = new Subject<void>();
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);

  ngOnInit() {
    this.token = this.authService.getToken();
    this.getEmailFromToken(this.token);
    this.loadUserData();
  }

  private getEmailFromToken(token: string | null): void {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.email = payload.email || '';
    }
  }

  private loadUserData(): void {
    this.loading = true;
    this.userService
      .getUserDetails()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (userData: UserInfo) => {
          this.firstName = userData.firstName || '';
          this.middleName = userData.middleName || '';
          this.lastName = userData.lastName || '';
          this.phoneNumber = userData.phoneNumber || '';
          this.address = userData.address || '';
          this.city = userData.city || '';
          this.postalCode = userData.postalCode || '';
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading user data', err);
          this.error = 'Failed to load user data. Please try again.';
          this.loading = false;
        },
      });
  }

  protected onSubmit() {
    this.submitted = true;
    this.success = false;
    this.error = null;

    if (!this.validateForm()) {
      return;
    }

    this.loading = true;

    const user: User = {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
      address: this.address,
      city: this.city,
      postalCode: this.postalCode,
    };
    console.log('User data to be updated:', user);
    this.userService
      .updateUserProfile(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (ResponseLogin: ResponseLogin) => {
          this.authService.changeLogin(ResponseLogin);
          this.success = true;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error updating user data', err);
          this.error = 'Failed to update profile. Please try again.';
          this.loading = false;
        },
      });
  }

  private validateForm(): boolean {
    this.isFormValid = true;

    if (!this.firstName || !this.lastName || !this.email || !this.password) {
      this.error = 'Please fill in all required fields.';
      this.isFormValid = false;
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.email)) {
      this.error = 'Please enter a valid email address.';
      this.isFormValid = false;
      return false;
    }
    return true;
  }

  protected onCancel() {
    this.router.navigate(['/profile']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
