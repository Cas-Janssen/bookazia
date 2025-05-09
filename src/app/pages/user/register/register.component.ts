import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location, NgIf } from '@angular/common';
import { Register } from '../../../models/Register';
import { AuthService } from '../../../services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NgIf, TranslatePipe],
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
  private translate: TranslateService = inject(TranslateService);

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
      this.scrollToTop();
      return;
    } else if (!this.isValidEmail(this.email)) {
      this.errorMessage = this.translate.instant(
        'REGISTER.ERROR_INVALID_EMAIL'
      );
      this.scrollToTop();
      return;
    } else if (this.isButtonDisabled) {
      this.errorMessage = this.translate.instant('REGISTER.ERROR_FILL_FIELDS');
      this.scrollToTop();
    } else {
      this.authService
        .register(registerData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.errorMessage = null;
            window.alert(this.translate.instant('REGISTER.SUCCESS'));
            this.router.navigate(['/profile']);
          },
          error: () => {
            this.errorMessage = this.translate.instant(
              'REGISTER.ERROR_PASSWORD_REQUIREMENTS'
            );
            this.isButtonDisabled = true;
            this.scrollToTop();
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

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
