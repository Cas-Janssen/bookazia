import { Component, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgClass, NgIf, Location } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, NgIf, NgClass],
})
export class LoginComponent {
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  protected email: string = '';
  protected password: string = '';
  protected errorMessage: string | null = null;
  protected isButtonDisabled: boolean = true;
  private location: Location = inject(Location);
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
      const subscription = this.authService.login(loginData).subscribe({
        next: (responseData) => {
          this.errorMessage = null;
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error:', error);
          this.errorMessage =
            'The combination of email address and password is not valid!';
          this.isButtonDisabled = true;
        },
      });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
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
