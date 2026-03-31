import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [],
  standalone: true,
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  private translate: TranslateService = inject(TranslateService);
  @Input() title = this.translate.instant('ADMIN.PANEL.CONFIRM_TITLE');
  @Input() message = this.translate.instant('ADMIN.PANEL.CONFIRM_MESSAGE');
  @Input() confirmText = this.translate.instant('ADMIN.PANEL.CONFIRM');
  @Input() cancelText = this.translate.instant('ADMIN.PANEL.CANCEL');

  @Output() result = new EventEmitter<boolean>();

  protected onResult(confirmed: boolean): void {
    this.result.emit(confirmed);
  }
}
