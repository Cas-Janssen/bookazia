import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class PersonalInfoComponent {
  @Output() personalInfoChange = new EventEmitter<any>();
  firstName: string = '';
  middleName?: string;
  lastName: string = '';
  address: string = '';
  city: string = '';
  postalCode: string = '';
  email: string = '';
  phoneNumber?: string;

  onInputChange(): void {
    const personalInfo = {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      address: this.address,
      city: this.city,
      postalCode: this.postalCode,
      email: this.email,
      phoneNumber: this.phoneNumber,
    };
    this.personalInfoChange.emit(personalInfo);
  }
}
