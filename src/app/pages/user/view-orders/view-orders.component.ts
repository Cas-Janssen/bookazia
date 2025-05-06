import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { OrderService } from '../../../services/order.service';
import { TranslateModule } from '@ngx-translate/core';
import { OrderResponse } from '../../../models/OrderResponse';

@Component({
  selector: 'app-view-orders',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss'],
  providers: [DatePipe],
})
export class ViewOrdersComponent implements OnInit, OnDestroy {
  orders: OrderResponse[] = [];
  isLoading = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private orderService: OrderService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.error = null;

    this.orderService
      .getOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (orders) => {
          this.orders = this.sortOrdersByDate(orders);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching orders:', error);
          this.error = 'ORDERS.ERROR_LOADING';
          this.isLoading = false;
        },
      });
  }

  private sortOrdersByDate(orders: OrderResponse[]): OrderResponse[] {
    return [...orders].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
  }

  navigateToShop(): void {
    this.router.navigate(['/books']);
  }

  formatDate(dateString: Date | string): string {
    if (!dateString) return '';

    const formattedDate = this.datePipe.transform(
      dateString,
      'MMM d, y, h:mm a'
    );

    return formattedDate || '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
