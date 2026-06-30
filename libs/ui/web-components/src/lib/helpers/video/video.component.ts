import { Component, input } from '@angular/core';
import { VideoDialogService } from './service/video.dialog.service';

/**
 * SDuXVideoComponent
 * ------------------
 * Displays a clickable YouTube video thumbnail with a play button overlay.
 * On click, opens a dialog with the embedded video player via VideoDialogService.
 *
 * Usage
 * -----
 * ```html
 * <sdux-video videoId="m7ClyWSh754" [start]="262" [tooltip]="'Pipeline Stages'" />
 * ```
 */
@Component({
  selector: 'sdux-video',
  standalone: true,
  template: `
    <div class="video-box">
      <div class="video-title">{{ tooltip() }}</div>
      <div
        class="video-wrapper"
        (click)="open()"
        role="button"
        tabindex="0"
        (keydown.enter)="open()"
        [attr.aria-label]="tooltip() + ' — Click to Play'">
        <div class="video-thumbnail">
          <img
            [src]="thumbnailUrl"
            [alt]="tooltip() + ' — YouTube Video Thumbnail'"
            loading="lazy" />
          <div class="play-overlay">
            <svg viewBox="0 0 68 48" width="68" height="48">
              <path
                d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.63-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                fill="#FF0000" />
              <path d="M45 24L27 14v20" fill="#fff" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./video.component.scss']
})
export class SDuXVideoComponent {
  /** Required YouTube video identifier. */
  readonly videoId = input.required<string>();

  /** Optional start time in seconds for the embedded player. */
  readonly start = input<number | undefined>(undefined);

  /** Tooltip and title displayed above the thumbnail. */
  readonly tooltip = input<string>('Video');

  /** Video dialog service used to open the player overlay. */
  constructor(private readonly videoDialog: VideoDialogService) {}

  /** YouTube thumbnail URL derived from the video identifier. */
  get thumbnailUrl(): string {
    return `https://img.youtube.com/vi/${this.videoId()}/mqdefault.jpg`;
  }

  /** Opens the video dialog with the current video configuration. */
  open(): void {
    this.videoDialog.open(this.videoId(), this.start(), this.tooltip());
  }
}
