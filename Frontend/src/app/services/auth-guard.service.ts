import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  public canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      if (this.authService.isValidToken()) {
        return true;
      }
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
