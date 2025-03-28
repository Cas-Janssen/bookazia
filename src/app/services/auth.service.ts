import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseLoginData } from '../models/ResponseLoginData';
import { environment } from '../../environments/environment';
import { Login } from '../models/Login';
import { tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private token: string | null = null;
  private apiLink: string = environment.apiUrl;
  currentLoginStatus = this.loggedIn.asObservable();

  constructor() {
    this.loadTokenFromLocalStorage();
    if (this.token != null) {
      this.loggedIn.next(true);
    }
  }

  public isAuthenticated(): boolean {
    return this.loggedIn.getValue();
  }
  public login(login: Login) {
    const subscription = this.httpClient
      .post<ResponseLoginData>(this.apiLink + '/auth/login', login)
      .pipe(
        tap((responseData) => {
          if (responseData.token) {
            this.loggedIn.next(true);
            this.token = responseData.token;
            this.saveTokenInLocalStorage(responseData.token);
          }
        })
      );
    return subscription;
  }

  public getToken(): string | null {
    return this.token;
  }

  private saveTokenInLocalStorage(token: string) {
    localStorage.setItem('authToken', token);
  }

  private loadTokenFromLocalStorage() {
    this.token = localStorage.getItem('authToken');
  }

  public logout() {
    this.loggedIn.next(false);
    this.token = null;
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }
}
