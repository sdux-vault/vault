import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DiagramDisplayComponent } from '../diagram-display/diagram-display.component';
import { DiagramDisplayDataModel } from '../models/diagram-display.model';

/**
 * DiagramDialogService
 * --------------------
 * A lightweight helper service responsible for opening full-size diagram
 * previews within the documentation application. This service centralizes
 * dialog configuration so that all diagrams open with consistent
 * sizing, layout, and styling.
 *
 * Overview
 * --------
 * This service works in tandem with `<sdux-diagram>` and
 * `<sdux-image>`:
 *
 * • Inline diagrams are shown at a constrained max height (e.g., 400px)
 * • Clicking a diagram triggers this service
 * • The service opens a full-size preview dialog at **80vw** width
 * • The dialog displays the same asset using `<sdux-image>` with dark/light
 *   theme support
 *
 * The service does not perform any image resolution or theme logic itself;
 * it simply forwards the provided inputs to `DiagramDisplayComponent`.
 *
 * Configuration
 * -------------
 * • `width: '80vw'` ensures consistent dialog width across all diagrams
 * • `panelClass: 'sdux-diagram-dialog-panel'` allows global dialog styling,
 *   including max-height, padding, and overflow behavior
 * • Data passed to the dialog includes:
 *    - `image` (required): path to the diagram asset
 *    - `tooltip` (optional): description used for alt text and UI hints
 *
 * This service is provided in the application's root injector and does
 * not require manual registration.
 *
 * Usage
 * -----
 * ```ts
 * constructor(private diagrams: DiagramDialogService) {}
 *
 * openDiagram() {
 *   this.diagrams.open('diagrams/1.0/lifecycle.svg', 'FeatureCell Lifecycle');
 * }
 * ```
 *
 * When `<sdux-diagram>` is used, it calls this service automatically on click.
 */
@Injectable({
  providedIn: 'root'
})
export class DiagramDialogService {
  /**
   * constructor
   * @param dialog The MatDialog from DI
   */
  constructor(private readonly dialog: MatDialog) {}

  /**
   * Opens a diagram preview dialog at a fixed width.
   *
   * @param image - The relative asset path of the diagram to display.
   * @param height - The height of the dialog box
   * @param width - The width of the dialog box
   * @param tooltip - Optional descriptive text used for dialog accessibility
   *                  and alt text inside the preview component.
   */

  open(image: string, imgW: number, imgH: number, tooltip?: string): void {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const maxW = vw * 0.8;
    const maxH = vh * 0.8;

    const scale = Math.min(maxW / imgW, maxH / imgH);

    const dialogWidth = Math.round(imgW * scale);
    const dialogHeight = Math.round(imgH * scale) + 110;

    this.dialog.open(DiagramDisplayComponent, {
      width: `${dialogWidth}px`,
      height: `${dialogHeight}px`,
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: { image, tooltip } as DiagramDisplayDataModel,
      panelClass: 'sdux-diagram-dialog-panel'
    });
  }
}
