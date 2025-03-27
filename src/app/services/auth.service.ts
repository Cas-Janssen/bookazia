import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseLoginData } from '../models/ResponseLoginData';
import { environment } from '../../environments/environment';
import { Login } from '../models/Login';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private loggedIn: boolean = false;
  private token: string | null = null;

  constructor() {
    this.loadTokenFromLocalStorage();
    if (this.token != null) {
      this.loggedIn = true;
    }
  }

  public isAuthenticated(): boolean {
    return this.loggedIn;
  }
  public login(login: Login) {
    const subscription = this.httpClient
      .post<ResponseLoginData>(environment.apiUrl + '/auth/login', login)
      .pipe(
        tap((responseData) => {
          if (responseData.token) {
            this.loggedIn = true;
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
}
