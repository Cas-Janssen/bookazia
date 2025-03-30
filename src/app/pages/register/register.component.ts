import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  protected firstName: string = '';
  protected middleName: string = '';
  protected lastName: string = '';
  protected password: string = '';
  protected email: string = '';
  protected phoneNumber: string = '';
  protected address: string = '';
  protected city: string = '';
  protected zipCode: string = '';
  private location: Location = inject(Location);

  public goBack(): void {
    this.location.back();
  }
  protected onSubmit(): void {
    location.reload();
  }
}
