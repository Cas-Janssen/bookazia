import { inject, Injectable } from '@angular/core';
import { ProductCart } from '../models/ProductCart';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Order } from '../models/Order';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private httpClient: HttpClient = inject(HttpClient);
  private apiLink: String = environment.apiUrl;

  public placeOrder(productCart: ProductCart[]): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/checkout']);
      console.log('Order placed:', productCart);
    }
  }
  public addOrderToDatabase(order: Order): void {
    this.httpClient.post(this.apiLink + '/orders/add', order);
  }
}
