import { Component } from '@angular/core';
import { PersonalInfoComponent } from './steps/1-personal-info/personal-info.component';
import { DeliveryOptionComponent } from './steps/2-delivery-option/delivery-option.component';
import { PaymentComponent } from './steps/3-payment/payment.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [
    PersonalInfoComponent,
    DeliveryOptionComponent,
    PaymentComponent,
    NgIf,
  ],
})
export class CheckoutComponent {
  protected currentStep: number = 1;

  protected nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  protected previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}
