import { JsonPipe, KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

/**
 * InfoDialogComponent
 * -------------------
 * A simple, reusable dialog component for displaying structured
 * debugging or inspection data. It is typically opened from
 * `InfoDialogService` and supports rendering arbitrary JSON-like
 * objects using Angular’s built-in pipes.
 *
 * Features
 * --------
 * • Receives data via Angular Material’s `MAT_DIALOG_DATA` token
 * • Displays object properties using `KeyValuePipe`
 * • Provides a raw JSON view using `JsonPipe`
 * • Includes a close button wired to the dialog ref
 *
 * Inputs
 * ------
 * • `MAT_DIALOG_DATA` — Any value passed when opening the dialog
 *
 * Usage Example
 * -------------
 * ```ts
 * infoDialogService.open({ name: 'Alice', role: 'Manager' });
 * ```
 *
 * The dialog automatically renders all key/value pairs and exposes
 * a close button in its template.
 */
@Component({
  selector: 'sdux-info-dialog',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, KeyValuePipe, JsonPipe],
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent {
  /** Raw data injected through Angular Material dialog API. */
  public readonly data = inject(MAT_DIALOG_DATA);

  /** Reference to the open dialog, used to close it programmatically. */
  private readonly dialogRef = inject(MatDialogRef<InfoDialogComponent>);

  /**
   * Closes the dialog.
   */
  close(): void {
    this.dialogRef.close();
  }
}
