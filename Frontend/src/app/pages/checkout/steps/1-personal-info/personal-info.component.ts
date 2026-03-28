import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CartService } from '../../../../services/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  imports: [FormsModule, TranslatePipe, CommonModule],
})
export class PersonalInfoComponent implements OnInit, OnDestroy {
  @Output() personalInfoChange = new EventEmitter<any>();
  firstName: string = '';
  middleName?: string;
  lastName: string = '';
  address: string = '';
  city: string = '';
  postalCode: string = '';
  email: string = '';
  phoneNumber?: string;
  private destroy$: Subject<void> = new Subject<void>();
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  private cartService: CartService = inject(CartService);
  private router: Router = inject(Router);
  private token: string | null = null;
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private translate: TranslateService = inject(TranslateService);

  ngOnInit(): void {
    this.checkCartStatus();
    if (this.authService.isAuthenticated()) {
      this.token = this.authService.getToken();
      if (this.token) {
        const payload = JSON.parse(atob(this.token.split('.')[1]));
        this.email = payload.email || '';
      }
      this.userService
        .getUserDetails()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (userInfo) => {
            this.firstName = userInfo.firstName || '';
            this.middleName = userInfo.middleName || undefined;
            this.lastName = userInfo.lastName || '';
            this.address = userInfo.address || '';
            this.city = userInfo.city || '';
            this.postalCode = userInfo.postalCode || '';
            this.phoneNumber = userInfo.phoneNumber || undefined;
            this.onInputChange();
          },
          error: (error) => {
            console.error('Error fetching user details:', error);
          },
        });
    }
  }

  private showSnackBar(
    messageKey: string,
    panelClass: string = 'info-snackbar'
  ): void {
    this.translate
      .get([messageKey, 'SNACKBAR.CLOSE'])
      .subscribe((translations) => {
        this.snackBar.open(
          translations[messageKey],
          translations['SNACKBAR.CLOSE'],
          {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 3000,
            panelClass: [panelClass],
          }
        );
      });
  }

  private checkCartStatus(): void {
    if (this.authService.isAuthenticated()) {
      this.cartService
        .getShoppingCartFromDatabase()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              if (response.cartItems.length > 0) {
                return;
              } else {
                this.showSnackBar(
                  'CHECKOUT.VALIDATION.EMPTY_CART',
                  'error-snackbar'
                );
                this.router.navigate(['/cart']);
              }
            }
          },
          error: (error) => {
            console.error('Error fetching shopping cart:', error);
            this.showSnackBar(
              'CHECKOUT.VALIDATION.FETCH_CART_ERROR',
              'error-snackbar'
            );
            this.router.navigate(['/cart']);
          },
        });
    } else {
      if (this.cartService.getCartItemsFromLocalStorage().length < 1) {
        this.showSnackBar('CHECKOUT.VALIDATION.EMPTY_CART', 'error-snackbar');
        this.router.navigate(['/cart']);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onInputChange(): void {
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
