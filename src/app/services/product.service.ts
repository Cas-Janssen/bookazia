import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiLink: String = environment.apiUrl;
  private httpClient: HttpClient = inject(HttpClient);

  public getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiLink + '/products');
  }

  public getProductById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(
      this.apiLink + `/products/${productId}`
    );
  }

  public searchProducts(searchTerm: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      this.apiLink + `/products/search/${searchTerm}`
    );
  }
}
