import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location, NgIf } from '@angular/common';
import { Register } from '../../../models/Register';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  protected firstName: string = '';
  protected middleName: string = '';
  protected lastName: string = '';
  protected password: string = '';
  protected email: string = '';
  protected errorMessage: string | null = null;
  protected isButtonDisabled: boolean = false;
  private destroyRef: DestroyRef = inject(DestroyRef);
  private location: Location = inject(Location);
  private authService: AuthService = inject(AuthService);

  public goBack(): void {
    this.location.back();
  }
  protected register(): void {
    const registerData: Register = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email.toLowerCase(),
      password: this.password,
      ...(this.middleName && { middleName: this.middleName }),
    };
    console.log(registerData);
    if (this.isInputFieldEmpty()) {
      return;
    } else if (this.isButtonDisabled) {
      this.errorMessage = 'Please change a value before submitting again!';
    } else {
      const subscription = this.authService.register(registerData).subscribe({
        next: (responseData) => {
          this.errorMessage = null;
        },
        error: (error) => {
          (this.errorMessage = 'Please use valid credentials to register!'),
            (this.isButtonDisabled = true);
        },
      });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }
  protected onInputChange(): void {
    this.errorMessage = null;
    this.isButtonDisabled = false;
    this.isInputFieldEmpty();
  }

  private isInputFieldEmpty(): boolean {
    if (
      this.email == '' ||
      this.password == '' ||
      this.firstName == '' ||
      this.lastName == ''
    ) {
      this.isButtonDisabled = true;
      this.errorMessage = 'Please fill in all fields';
      return true;
    } else {
      this.isButtonDisabled = false;
      this.errorMessage = null;
      return false;
    }
  }
}
