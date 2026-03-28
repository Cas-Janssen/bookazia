import { Injectable, inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable, takeUntil } from 'rxjs';
import { SavedCart } from '../models/SavedCart';

@Injectable({
  providedIn: 'root',
})
export class SavedItemsService implements OnDestroy {
  private httpClient: HttpClient = inject(HttpClient);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private translate: TranslateService = inject(TranslateService);
  private apiLink: string = `${environment.apiUrl}/user/saved`;
  private destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private showSnackBar(
    messageKey: string,
    panelClass: string = 'info-snackbar'
  ): void {
    const message = this.translate.instant(messageKey);
    this.snackBar.open(message, this.translate.instant('SNACKBAR.CLOSE'), {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [panelClass],
    });
  }

  public getSavedItems(): Observable<SavedCart> {
    return this.httpClient.get<SavedCart>(this.apiLink);
  }

  public addSavedItem(productId: number): void {
    this.httpClient
      .post(`${this.apiLink}/add/${productId}`, {})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.showSnackBar('SAVED_ITEMS.ITEM_ADDED', 'success-snackbar');
        },
        error: (err: HttpErrorResponse) => {
          if (err.error?.message === 'Product already in saved cart!') {
            this.showSnackBar(
              'SAVED_ITEMS.ITEM_ALREADY_SAVED',
              'info-snackbar'
            );
          } else {
            console.error('Error adding saved item:', err);
            this.showSnackBar(
              'SAVED_ITEMS.ERROR_ADDING_ITEM',
              'error-snackbar'
            );
          }
        },
      });
  }

  public removeSavedItem(productId: number): void {
    this.httpClient
      .delete(`${this.apiLink}/delete/${productId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.showSnackBar('SAVED_ITEMS.ITEM_REMOVED', 'success-snackbar');
        },
        error: () => {
          this.showSnackBar(
            'SAVED_ITEMS.ERROR_REMOVING_ITEM',
            'error-snackbar'
          );
        },
      });
  }

  public clearSavedItems(): void {
    this.httpClient
      .delete(`${this.apiLink}/clear`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.showSnackBar('SAVED_ITEMS.CLEARED', 'success-snackbar');
        },
        error: () => {
          this.showSnackBar(
            'SAVED_ITEMS.ERROR_CLEARING_ITEMS',
            'error-snackbar'
          );
        },
      });
  }
}
