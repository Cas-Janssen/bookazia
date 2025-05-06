import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-delivery-option',
  templateUrl: './delivery-option.component.html',
  styleUrls: ['./delivery-option.component.scss'],
  standalone: true,
  imports: [FormsModule, TranslatePipe],
})
export class DeliveryOptionComponent {
  @Output() deliveryOptionChange = new EventEmitter<string>();
  selectedOption: string = '';

  onOptionChange(): void {
    this.deliveryOptionChange.emit(this.selectedOption);
  }
}
