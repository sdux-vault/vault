import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { ConfirmDialogData } from '../../shapes/confirm-dialog/confirm-dialog-data.shape';

/**
 * Generic confirmation dialog that displays a title, message, and
 * confirm/cancel buttons. Returns `true` when the user confirms
 * and `false` (or `undefined`) when cancelled or dismissed.
 */
@Component({
  selector: 'sdux-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
  /** Injected dialog data containing title, message, and button labels. */
  readonly data: ConfirmDialogData = inject(MAT_DIALOG_DATA);

  /** Reference to the dialog instance for programmatic close. */
  #dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

  /** Closes the dialog with a `true` result. */
  confirm(): void {
    this.#dialogRef.close(true);
  }

  /** Closes the dialog with a `false` result. */
  cancel(): void {
    this.#dialogRef.close(false);
  }
}
