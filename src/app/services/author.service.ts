import { inject, Injectable } from '@angular/core';
import { Author } from '../models/Author';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiLink: String = environment.apiUrl;

  public getAllAuthors(): Observable<Author[]> {
    return this.httpClient.get<Author[]>(this.apiLink + '/authors');
  }
  public getAuthorById(authorId: number): Observable<Author> {
    return this.httpClient.get<Author>(this.apiLink + `/authors/${authorId}`);
  }
  public addAuthor(firstName: string, lastName: string): Observable<Author> {
    return this.httpClient.post<Author>(this.apiLink + '/authors/add', {
      firstName,
      lastName,
    });
  }
}
