import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { environment } from '../../environments/environment';
import { AddProduct } from '../models/AddProduct';

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

  public addProduct(product: AddProduct): Observable<Product> {
    return this.httpClient.post<Product>(
      this.apiLink + '/products/add',
      product
    );
  }

  public updateProduct(
    product: AddProduct,
    productId: number
  ): Observable<Product> {
    return this.httpClient.put<Product>(
      this.apiLink + `/products/${productId}`,
      product
    );
  }

  public reactivateProduct(id: number): Observable<Product> {
    return this.httpClient.patch<Product>(
      `${this.apiLink}/products/activate/${id}`,
      id
    );
  }

  public deleteProduct(productId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiLink}/products/${productId}`
    );
  }
}
