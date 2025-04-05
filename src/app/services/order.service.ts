import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../models/Order';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private router: Router = inject(Router);
  private httpClient: HttpClient = inject(HttpClient);
  private apiLink: String = environment.apiUrl;

  public placeOrder(order: Order): void {
    this.httpClient.post(this.apiLink + '/orders/add', order).subscribe({
      next: (response) => {
        console.log('Order response:', response);
        this.router.navigate(['/order-success']);
      },
      error: (error) => {
        console.error('Error placing order:', error);
        this.router.navigate(['/order-failure']);
      },
    });
  }
}
