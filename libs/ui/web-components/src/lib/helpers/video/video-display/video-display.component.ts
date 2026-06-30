import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoDisplayDataModel } from '../models/video-display.model';

/**
 * Dialog content component that renders a YouTube video in a
 * privacy-enhanced iframe. Receives video metadata via MAT_DIALOG_DATA
 * and constructs a sanitized embed URL.
 */
@Component({
  selector: 'sdux-video-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  styleUrls: ['video-display.component.scss'],
  templateUrl: 'video-display.component.html'
})
export class VideoDisplayComponent {
  /** Sanitized YouTube embed URL bound to the iframe src. */
  readonly embedUrl: SafeResourceUrl;

  /** Video metadata injected from the dialog opener. */
  public data: VideoDisplayDataModel;

  /**
   * Initializes the component by constructing the sanitized YouTube embed URL
   * from the injected video metadata.
   *
   * @param data - Video display configuration injected via MAT_DIALOG_DATA.
   * @param sanitizer - Angular DomSanitizer for bypassing resource URL security.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) data: VideoDisplayDataModel,
    sanitizer: DomSanitizer
  ) {
    this.data = data;
    let url = `https://www.youtube-nocookie.com/embed/${this.data.videoId}?rel=0`;
    if (this.data.start) {
      url += `&start=${this.data.start}`;
    }
    this.embedUrl = sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
