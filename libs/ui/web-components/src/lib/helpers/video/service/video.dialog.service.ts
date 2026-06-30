import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VideoDisplayDataModel } from '../models/video-display.model';
import { VideoDisplayComponent } from '../video-display/video-display.component';

/**
 * Opens a Material Dialog containing the VideoDisplayComponent with a
 * responsive 16:9 layout sized to the current viewport.
 */
@Injectable({
  providedIn: 'root'
})
export class VideoDialogService {
  /** Material Dialog service used to open the video player overlay. */
  constructor(private readonly dialog: MatDialog) {}

  /**
   * Opens the video dialog with the specified YouTube video.
   *
   * @param videoId - YouTube video identifier.
   * @param start - Optional start time in seconds.
   * @param tooltip - Optional title displayed in the dialog header.
   */
  open(videoId: string, start?: number, tooltip?: string): void {
    const vw = window.innerWidth;

    const dialogWidth = Math.min(Math.round(vw * 0.8), 960);
    const dialogHeight = Math.round(dialogWidth * (9 / 16)) + 110;

    this.dialog.open(VideoDisplayComponent, {
      width: `${dialogWidth}px`,
      height: `${dialogHeight}px`,
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: { videoId, start, tooltip } as VideoDisplayDataModel,
      panelClass: 'sdux-video-dialog-panel'
    });
  }
}
