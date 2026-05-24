import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../helpers/info-dialog/info-dialog.component';

/**
 * Service that opens an informational dialog using Angular Material.
 */
@Injectable({ providedIn: 'root' })
export class InfoDialogService {
  /** Reference to the Angular Material dialog service. */
  private dialog = inject(MatDialog);

  /**
   * Opens an info dialog with the supplied data.
   *
   * @param data - Content payload passed to the dialog component.
   */
  // eslint-disable-next-line
  open(data: any): void {
    this.dialog.open(InfoDialogComponent, {
      width: '400px',
      data,
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'info-dialog-panel'
    });
  }
}
