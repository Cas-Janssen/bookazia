import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule],
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  protected email: string = '';
  protected password: string = '';

  protected goBack(): void {
    window.history.back();
  }

  protected goToRegisterMenu(): void {
    this.router.navigate(['/register']);
  }
  protected login(): void {
    const loginData = {
      email: this.email,
      password: this.password,
    };
    console.log(loginData);
    this.authService.login(loginData).subscribe({
      next: (responseData) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
