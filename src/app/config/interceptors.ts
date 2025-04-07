import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const authService: AuthService = inject(AuthService);
  const authToken: string | null = authService.getToken();
  if (authToken != null) {
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
    return next(newRequest);
  }
  return next(req);
}
