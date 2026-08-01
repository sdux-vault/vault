import { DOCUMENT } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { AnalyticsService } from '../../services/analytics/analytics.service';

/**
 * Displays a tooltip-enabled download icon for a URL.
 *
 * The helper records the download interaction and uses a temporary anchor so
 * the browser handles the download using its normal URL rules.
 */
@Component({
  selector: 'sdux-download',
  standalone: true,
  imports: [MatIcon, MatTooltip],
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class SDuXDownloadComponent {
  /** The URL of the file to download. */
  readonly url = input.required<string>();

  /** Tooltip and accessible label for the download control. */
  readonly tooltip = input('Download');

  /** Provides access to the document used to create the temporary download link. */
  readonly #document = inject(DOCUMENT);

  /** Records the file download interaction. */
  readonly #analyticsService = inject(AnalyticsService);

  /** Records the interaction and starts the browser download. */
  download(): void {
    const url = this.url();
    const link = this.#document.createElement('a');
    const fileName = this.getFileName(url);

    this.#analyticsService.trackDownloadInteraction(fileName);

    link.href = url;
    link.download = fileName;
    link.rel = 'noopener';
    link.style.display = 'none';
    this.#document.body.appendChild(link);
    link.click();
    link.remove();
  }

  /**
   * Extracts a download name from a relative or absolute URL.
   *
   * @param url Supplies the file URL from which the name is extracted.
   * @returns The decoded final path segment or a fallback download name.
   */
  private getFileName(url: string): string {
    try {
      const pathname = new URL(url, this.#document.location?.href).pathname;
      const fileName = decodeURIComponent(pathname.split('/').pop() ?? '');
      return fileName || 'download';
    } catch {
      return 'download';
    }
  }
}
