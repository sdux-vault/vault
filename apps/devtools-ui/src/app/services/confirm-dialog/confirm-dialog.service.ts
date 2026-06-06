import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { ConfirmDialogData } from '../../shapes/confirm-dialog/confirm-dialog-data.shape';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

/**
 * Injectable service that opens a confirmation dialog and returns
 * an Observable that emits `true` when the user confirms or `false`
 * when they cancel or dismiss the dialog.
 */
@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  /** Angular Material dialog service. */
  #dialog = inject(MatDialog);

  /**
   * Opens a confirmation dialog with the provided data.
   *
   * @param data - Title, message, and optional button labels.
   * @returns Observable that emits `true` on confirm, `false` on cancel/dismiss.
   */
  confirm(data: ConfirmDialogData): Observable<boolean> {
    const dialogRef = this.#dialog.open(ConfirmDialogComponent, {
      data,
      width: '400px',
      disableClose: true
    });

    return dialogRef.afterClosed().pipe(map((result) => result === true));
  }
}
