import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ImageComponent } from '../../image/image.component';
import { DiagramDisplayDataModel } from '../models/diagram-display.model';

/**
 * Full-size diagram viewer rendered inside a modal dialog.
 * This component displays a diagram image with selectable scale options for detailed inspection.
 *
 */
@Component({
  selector: 'sdux-diagram-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, ImageComponent],
  styleUrls: ['diagram-display.component.scss'],
  templateUrl: 'diagram-display.component.html'
})
export class DiagramDisplayComponent {
  /**
   * Creates a new diagram display dialog instance.
   *
   * @param data - Diagram display data supplied via dependency injection.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: DiagramDisplayDataModel) {}

  /** Current zoom scale factor. */
  zoom = 1;

  /** Horizontal pan offset in pixels. */
  panX = 0;

  /** Vertical pan offset in pixels. */
  panY = 0;

  /** Whether a pan gesture is currently active. */
  private isPanning = false;

  /** Horizontal pointer start position for the current pan gesture. */
  private startX = 0;

  /** Vertical pointer start position for the current pan gesture. */
  private startY = 0;

  /** Increases the zoom level by one step, capped at the maximum. */
  zoomIn() {
    this.zoom = Math.min(this.zoom + 0.25, 4);
  }

  /** Decreases the zoom level by one step and resets pan at minimum. */
  zoomOut() {
    this.zoom = Math.max(this.zoom - 0.25, 1);

    if (this.zoom === 1) {
      this.panX = 0;
      this.panY = 0;
    }
  }

  /**
   * Handles mouse wheel zoom with cursor-anchored scaling.
   *
   * @param event - The wheel event from the diagram viewer.
   */
  onWheel(event: WheelEvent) {
    event.preventDefault();

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

    // mouse position inside viewer
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;

    const newZoom = Math.min(Math.max(this.zoom * zoomFactor, 1), 4);

    // calculate zoom offset so the cursor position stays fixed
    const zoomRatio = newZoom / this.zoom;

    this.panX = mouseX - zoomRatio * (mouseX - this.panX);
    this.panY = mouseY - zoomRatio * (mouseY - this.panY);

    this.zoom = newZoom;

    if (this.zoom === 1) {
      this.panX = 0;
      this.panY = 0;
    }
  }

  /** Resets zoom and pan to default values. */
  reset() {
    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
  }

  /** Toggles between default and 2x zoom. */
  toggleZoom() {
    this.zoom = this.zoom === 1 ? 2 : 1;
  }

  /**
   * Initiates a pointer-driven pan gesture when zoomed in.
   *
   * @param event - The pointer event that started the pan.
   */
  startPan(event: PointerEvent) {
    if (this.zoom <= 1) return;

    this.isPanning = true;

    const viewer = (event.currentTarget as HTMLElement).closest(
      '.diagram-viewer'
    );
    viewer?.classList.add('panning');

    this.startX = event.clientX - this.panX;
    this.startY = event.clientY - this.panY;

    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  }

  /**
   * Ends the current pan gesture and removes the panning class.
   *
   * @param event - The pointer event that ended the pan.
   */
  stopPan(event?: PointerEvent) {
    this.isPanning = false;

    const viewer = (event?.currentTarget as HTMLElement)?.closest(
      '.diagram-viewer'
    );
    viewer?.classList.remove('panning');
  }

  /**
   * Updates pan offsets during an active pan gesture.
   *
   * @param event - The pointer move event.
   */
  onPan(event: PointerEvent) {
    if (!this.isPanning) return;

    this.panX = event.clientX - this.startX;
    this.panY = event.clientY - this.startY;
  }
}
