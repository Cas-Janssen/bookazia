import { inject, Injectable } from '@angular/core';
import { UserInfo } from '../models/UserInfo';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { ResponseLogin } from '../models/ResponseLogin';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiLink: String = environment.apiUrl;

  getUserDetails(): Observable<UserInfo> {
    return this.httpClient.get<UserInfo>(this.apiLink + '/user/me');
  }

  updateUserProfile(user: User): Observable<ResponseLogin> {
    return this.httpClient.put<ResponseLogin>(
      this.apiLink + '/user/update',
      user
    );
  }
}
