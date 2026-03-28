import { inject, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../models/Order';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { OrderResponse } from '../models/OrderResponse';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements OnDestroy {
  private router: Router = inject(Router);
  private httpClient: HttpClient = inject(HttpClient);
  private apiLink: String = environment.apiUrl;
  private destroy$: Subject<void> = new Subject<void>();
  private currentOrder = new BehaviorSubject<OrderResponse | null>(null);
  currentOrder$ = this.currentOrder.asObservable();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public placeOrder(order: Order): void {
    this.httpClient
      .post<OrderResponse>(this.apiLink + '/orders/add', order)
      .pipe(
        takeUntil(this.destroy$),
        tap((response: OrderResponse) => {
          this.currentOrder.next(response);
        })
      )
      .subscribe({
        next: (response) => {
          this.router.navigate(['/order/success'], {
            queryParams: { orderId: response.id.toString() },
          });
        },
        error: (error) => {
          console.error('Error placing order:', error);
          this.router.navigate(['/order/failure']);
        },
      });
  }

  public getOrders(): Observable<OrderResponse[]> {
    return this.httpClient
      .get<OrderResponse[]>(this.apiLink + '/orders')
      .pipe(takeUntil(this.destroy$));
  }
}
