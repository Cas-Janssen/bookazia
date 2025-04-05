import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/Category';
import { CategoryDetails } from '../models/CategoryDetails';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiLink: string = environment.apiUrl;
  private httpClient: HttpClient = inject(HttpClient);

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiLink + '/categories/names');
  }
  getCategoryDetails(categoryName: string): Observable<CategoryDetails> {
    return this.httpClient.get<CategoryDetails>(
      this.apiLink + '/categories/' + categoryName
    );
  }
}
