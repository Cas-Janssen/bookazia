import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class PaymentComponent {
  @Output() paymentMethodChange = new EventEmitter<string>();
  selectedPaymentMethod: string = '';

  onPaymentMethodChange(): void {
    this.paymentMethodChange.emit(this.selectedPaymentMethod);
  }
}
