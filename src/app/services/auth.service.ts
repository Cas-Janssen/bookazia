import { Injectable, inject } from '@angular/core';
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
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private token: string | null = null;
  private apiLink: string = environment.apiUrl;
  public currentLoginStatus = this.loggedIn.asObservable();

  constructor() {
    this.loadTokenFromLocalStorage();
    if (this.token != null) {
      this.loggedIn.next(true);
    }
  }

  public isAuthenticated(): boolean {
    return this.loggedIn.getValue();
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
}
