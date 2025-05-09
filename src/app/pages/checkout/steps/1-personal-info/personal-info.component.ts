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
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  imports: [FormsModule, TranslatePipe],
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
  private token: string | null = null;

  ngOnInit(): void {
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
