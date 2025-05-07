import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { first, Observable } from 'rxjs';
import { Publisher } from '../models/Publisher';

@Injectable({
  providedIn: 'root',
})
export class PublisherService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiLink: String = environment.apiUrl;

  public getAllPublishers(): Observable<Publisher[]> {
    return this.httpClient.get<Publisher[]>(this.apiLink + '/publishers');
  }
  public getPublisherById(publisherId: number): Observable<Publisher> {
    return this.httpClient.get<Publisher>(
      this.apiLink + `/publishers/${publisherId}`
    );
  }
  public addPublisher(
    firstName: string,
    lastName: string
  ): Observable<Publisher> {
    return this.httpClient.post<Publisher>(this.apiLink + '/publishers/add', {
      firstName,
      lastName,
    });
  }
}
