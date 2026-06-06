import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * Reusable download button that serializes arbitrary data to a JSON
 * file and triggers a browser download. Renders an inline SVG download
 * icon and stops click propagation so it can be embedded inside
 * interactive containers like tab labels.
 */
@Component({
  selector: 'sdux-export-button',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './export-button.component.html',
  styleUrl: './export-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportButtonComponent {
  /** Data array to serialize as JSON when the button is clicked. */
  readonly data = input.required<unknown[]>();

  /** Base filename used in the downloaded file (without extension). */
  readonly filename = input.required<string>();

  /** Tooltip and aria-label text for the button. */
  readonly label = input<string>('Download');

  /**
   * Serializes the data input to JSON, creates a Blob download,
   * and revokes the object URL after the click.
   *
   * @param event - The DOM click event; propagation is stopped.
   */
  download(event: Event): void {
    event.stopPropagation();

    const blob = new Blob([JSON.stringify(this.data(), null, 2)], {
      type: 'application/json'
    });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `sdux-${this.filename()}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
}
