import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { NgClass, NgIf, Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, NgIf, NgClass],
})
export class LoginComponent implements OnDestroy {
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private destroy$: Subject<void> = new Subject<void>();
  protected email: string = '';
  protected password: string = '';
  protected errorMessage: string | null = null;
  protected isButtonDisabled: boolean = true;
  private location: Location = inject(Location);

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected goBack(): void {
    this.location.back();
  }

  protected goToRegisterMenu(): void {
    this.router.navigate(['/register']);
  }

  protected login(): void {
    const loginData = {
      email: this.email.toLowerCase(),
      password: this.password,
    };
    if (this.isInputFieldEmpty()) {
      return;
    } else if (this.isButtonDisabled) {
      this.errorMessage = 'Please change a value before submitting again!';
    } else {
      this.authService
        .login(loginData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.errorMessage = null;
            this.router.navigate(['/']);
          },
          error: () => {
            this.errorMessage =
              'The combination of email address and password is not valid!';
            this.isButtonDisabled = true;
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
    if (this.email == '' || this.password == '') {
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
