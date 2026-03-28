import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { OrderService } from '../../../services/order.service';
import { OrderProduct, OrderResponse } from '../../../models/OrderResponse';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
})
export class OrderSuccessComponent implements OnInit {
  orderId: string = '';
  orderDate: Date = new Date();
  orderTotal: number = 0;
  orderItems: OrderProduct[] = [];
  loading: boolean = true;
  error: string | null = null;

  private router = inject(Router);
  private orderService = inject(OrderService);

  ngOnInit(): void {
    this.orderService.currentOrder$.subscribe((order) => {
      if (order) {
        this.displayOrderDetails(order);
        this.loading = false;
      } else {
        this.router.navigate(['not-found']);
      }
    });
  }

  private displayOrderDetails(order: OrderResponse): void {
    this.orderId = order.id.toString();
    this.orderDate = new Date(order.createdAt);
    this.orderTotal = order.totalPrice;
    this.orderItems = order.orderProducts || [];
  }
}
