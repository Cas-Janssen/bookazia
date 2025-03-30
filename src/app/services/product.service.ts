import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiLink: string = environment.apiUrl;
  private httpClient: HttpClient = inject(HttpClient);

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiLink + '/products');
  }

  getProductById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(
      this.apiLink + `/products/${productId}`
    );
  }
}
