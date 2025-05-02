import { inject, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../models/Order';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrderResponse } from '../models/OrderResponse';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements OnDestroy {
  private router: Router = inject(Router);
  private httpClient: HttpClient = inject(HttpClient);
  private apiLink: String = environment.apiUrl;
  private destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public placeOrder(order: Order): void {
    this.httpClient
      .post(this.apiLink + '/orders/add', order)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.router.navigate(['/order-success']);
        },
        error: (error) => {
          console.error('Error placing order:', error);
          this.router.navigate(['/order-failure']);
        },
      });
  }

  public getOrders(): Observable<OrderResponse[]> {
    return this.httpClient
      .get<OrderResponse[]>(this.apiLink + '/orders')
      .pipe(takeUntil(this.destroy$));
  }
}
