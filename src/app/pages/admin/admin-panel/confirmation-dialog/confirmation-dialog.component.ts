import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [CommonModule],
  template: `
    <div class="dialog-overlay" (click)="onResult(false)">
      <div class="dialog-container" (click)="$event.stopPropagation()">
        <div class="dialog-header">
          <h2>{{ title }}</h2>
          <button class="close-btn" (click)="onResult(false)">&times;</button>
        </div>
        <div class="dialog-content">
          {{ message }}
        </div>
        <div class="dialog-actions">
          <button class="btn btn-secondary" (click)="onResult(false)">
            {{ cancelText }}
          </button>
          <button class="btn btn-primary" (click)="onResult(true)">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }

      .dialog-container {
        background-color: white;
        border-radius: 8px;
        width: 90%;
        max-width: 500px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        overflow: hidden;
      }

      .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        background-color: #f7f3ed;
        border-bottom: 1px solid #eee;

        h2 {
          margin: 0;
          font-size: 18px;
          color: #7b5d49;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #555;

          &:hover {
            color: #333;
          }
        }
      }

      .dialog-content {
        padding: 20px;
        font-size: 16px;
        line-height: 1.5;
      }

      .dialog-actions {
        display: flex;
        justify-content: flex-end;
        padding: 15px 20px;
        gap: 10px;
        border-top: 1px solid #eee;

        .btn {
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;

          &.btn-secondary {
            background-color: #f0f0f0;
            border: 1px solid #ddd;
            color: #444;

            &:hover {
              background-color: #e4e4e4;
            }
          }

          &.btn-primary {
            background-color: #7b5d49;
            border: none;
            color: white;

            &:hover {
              background-color: #6a4f3e;
            }
          }
        }
      }
    `,
  ],
})
export class ConfirmationDialogComponent {
  @Input() title = 'Confirm';
  @Input() message = 'Are you sure?';
  @Input() confirmText = 'Yes';
  @Input() cancelText = 'No';

  @Output() result = new EventEmitter<boolean>();

  onResult(confirmed: boolean): void {
    this.result.emit(confirmed);
  }
}
