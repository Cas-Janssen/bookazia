import { Injectable, OnDestroy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseLogin } from '../models/ResponseLogin';
import { environment } from '../../environments/environment';
import { Login } from '../models/Login';
import { tap, BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Register } from '../models/Register';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private token: string | null = null;
  private apiLink: String = environment.apiUrl;
  public currentLoginStatus: Observable<boolean> = this.loggedIn.asObservable();

  constructor() {
    this.loadTokenFromLocalStorage();
    if (this.token) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
  }

  public isAuthenticated(): boolean {
    return this.loggedIn.getValue();
  }

  public isAdmin(): boolean {
    return false; // TODO: Implement admin check logic
  }

  public isValidToken(): boolean {
    if (this.checkValidityOfToken(this.token)) {
      return true;
    } else {
      this.loggedIn.next(false);
      this.token = null;
      localStorage.removeItem('authToken');
      this.router.navigate(['/login']);
      return false;
    }
  }

  private checkValidityOfToken(token: string | null): boolean {
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        const expirationDate = new Date(decodedPayload.exp * 1000);
        const currentDate = new Date();
        return expirationDate > currentDate;
      } catch (error) {
        console.error('Error decoding token:', error);
        console.log('Token is invalid or expired');
        return false;
      }
    } else {
      return false;
    }
  }
  public login(login: Login): Observable<ResponseLogin> {
    const subscription = this.httpClient
      .post<ResponseLogin>(this.apiLink + '/auth/login', login)
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
  public register(register: Register): Observable<ResponseLogin> {
    const subscription = this.httpClient
      .post<ResponseLogin>(this.apiLink + '/auth/register', register)
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

  public changeLogin(responseLogin: ResponseLogin): void {
    this.logout();
    this.loggedIn.next(true);
    this.token = responseLogin.token;
    this.saveTokenInLocalStorage(responseLogin.token);
  }

  public getToken(): string | null {
    return this.token;
  }

  private saveTokenInLocalStorage(token: string): void {
    localStorage.setItem('authToken', token);
  }

  private loadTokenFromLocalStorage(): void {
    this.token = localStorage.getItem('authToken');
  }

  public logout(): void {
    this.loggedIn.next(false);
    this.token = null;
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.loggedIn.complete();
  }
}
