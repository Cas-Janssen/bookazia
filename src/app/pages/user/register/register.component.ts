import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location, NgIf } from '@angular/common';
import { Register } from '../../../models/Register';
import { AuthService } from '../../../services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  protected firstName: string = '';
  protected middleName: string = '';
  protected lastName: string = '';
  protected password: string = '';
  protected email: string = '';
  protected errorMessage: string | null = null;
  protected isButtonDisabled: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();
  private router: Router = inject(Router);
  private location: Location = inject(Location);
  private authService: AuthService = inject(AuthService);

  public goBack(): void {
    this.location.back();
  }
  protected register(): void {
    const registerData: Register = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email.toLowerCase(),
      password: this.password,
      ...(this.middleName && { middleName: this.middleName }),
    };
    if (this.isInputFieldEmpty()) {
      return;
    } else if (this.isButtonDisabled) {
      this.errorMessage = 'Please change a value before submitting again!';
    } else {
      this.authService
        .register(registerData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.errorMessage = null;
            window.alert('Registration successful! You are now logged in.');
            this.router.navigate(['/profile']);
          },
          error: () => {
            (this.errorMessage =
              'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character!'),
              (this.isButtonDisabled = true);
          },
        });
    }
  }
  protected onInputChange(): void {
    this.errorMessage = null;
    this.isButtonDisabled = false;
    this.isInputFieldEmpty();
  }

  private isInputFieldEmpty(): boolean {
    if (
      this.email == '' ||
      this.password == '' ||
      this.firstName == '' ||
      this.lastName == ''
    ) {
      this.isButtonDisabled = true;
      this.errorMessage = 'Please fill in all fields';
      return true;
    } else {
      this.isButtonDisabled = false;
      this.errorMessage = null;
      return false;
    }
  }
}
