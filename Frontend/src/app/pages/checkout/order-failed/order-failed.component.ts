import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-order-failed',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './order-failed.component.html',
  styleUrl: './order-failed.component.scss',
})
export class OrderFailedComponent {}
