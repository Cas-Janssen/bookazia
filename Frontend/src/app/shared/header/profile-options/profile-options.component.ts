import {
  Component,
  Output,
  EventEmitter,
  Input,
  inject,
  HostListener,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';

import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-options',
  imports: [TranslatePipe],
  templateUrl: './profile-options.component.html',
  styleUrl: './profile-options.component.scss',
})
export class ProfileOptionsComponent {
  @Input() isOpen: boolean = false;
  @Output() closeMenu = new EventEmitter<void>();
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private elementRef: ElementRef = inject(ElementRef);
  protected isAdmin: boolean = false;
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private translate: TranslateService = inject(TranslateService);

  constructor() {
    this.authService.isAdminUser().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  @HostListener('document:click', ['$event'])
  public onClickOutside(event: MouseEvent): void {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu.emit();
    }
  }

  protected goToAdminMenu(): void {
    this.router.navigate(['/admin']);
    this.closeMenu.emit();
  }

  protected goToOrders(): void {
    this.router.navigate(['/profile/orders']);
    this.closeMenu.emit();
  }

  protected goToProfile(): void {
    this.router.navigate(['/profile']);
    this.closeMenu.emit();
  }

  protected goToEditProfile(): void {
    this.router.navigate(['/profile/edit']);
    this.closeMenu.emit();
  }

  protected logout(): void {
    this.authService.logout();
    this.snackBar.open(
      this.translate.instant('HEADER.LOGOUT_SUCCESS'),
      this.translate.instant('SNACKBAR.CLOSE'),
      {
        duration: 3000,
        panelClass: 'success-snackbar',
        verticalPosition: 'top',
        horizontalPosition: 'center',
      }
    );
    this.router.navigate(['/']);
    this.closeMenu.emit();
  }
}
