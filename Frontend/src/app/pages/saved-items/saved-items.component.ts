import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SavedItemsService } from '../../services/saved-items.service';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/Product';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-saved-items',
  templateUrl: './saved-items.component.html',
  styleUrl: './saved-items.component.scss',
  imports: [TranslatePipe, NgIf, NgFor, NgClass],
})
export class SavedItemsComponent implements OnInit, OnDestroy {
  private savedItemsService: SavedItemsService = inject(SavedItemsService);
  private cartService: CartService = inject(CartService);
  private destroy$: Subject<void> = new Subject<void>();
  private translate: TranslateService = inject(TranslateService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  public savedItems: Product[] = [];

  ngOnInit(): void {
    this.loadSavedItems();
  }

  private loadSavedItems(): void {
    this.savedItemsService
      .getSavedItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.savedItems = response.savedCartItems.map((item) => item.product);
        },
        error: (err) => {
          console.error('Error loading saved items:', err);
        },
      });
  }

  protected removeSavedItem(productId: number): void {
    this.savedItemsService.removeSavedItem(productId);
    this.savedItems = this.savedItems.filter((item) => item.id !== productId);
  }

  protected clearSavedItems(): void {
    this.savedItemsService.clearSavedItems();
    this.savedItems = [];
  }

  protected moveToCart(): void {
    const availableProducts = this.savedItems.filter(
      (item) => item.enabled && item.stock > 0
    );

    availableProducts.forEach((product) => {
      this.cartService.addCartItem(product);
    });

    this.savedItems = this.savedItems.filter(
      (item) => !availableProducts.includes(item)
    );

    availableProducts.forEach((product) => {
      this.savedItemsService.removeSavedItem(product.id);
    });

    if (availableProducts.length > 0) {
      this.showSnackBar('SAVED_ITEMS.MOVED_TO_CART', 'success-snackbar');
    } else {
      this.showSnackBar('SAVED_ITEMS.NO_AVAILABLE_ITEMS', 'info-snackbar');
    }
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
