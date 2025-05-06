import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  standalone: true,
  imports: [FormsModule, TranslatePipe],
})
export class PaymentComponent {
  @Output() paymentMethodChange = new EventEmitter<string>();
  selectedPaymentMethod: string = '';

  onPaymentMethodChange(): void {
    this.paymentMethodChange.emit(this.selectedPaymentMethod);
  }
}
