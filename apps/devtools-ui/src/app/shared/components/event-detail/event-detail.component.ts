import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EventShape } from '@sdux-vault/shared';
import { EscapeCloseDirective } from '../../directives/escape-close/escape-close.directive';

/**
 * Detail panel for displaying the full breakdown of a single pipeline event.
 *
 * Renders state metadata, event metadata, state value JSON, payload JSON,
 * and error JSON in a vertically scrollable pane. Designed to sit beside
 * the virtual-scrolled event list in a master-detail layout.
 */
@Component({
  selector: 'sdux-event-detail',
  standalone: true,
  imports: [CommonModule, EscapeCloseDirective, MatTooltipModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDetailComponent {
  /** The selected pipeline event to display in detail. */
  readonly event = input.required<EventShape>();

  /** Emits when the user closes the detail panel. */
  readonly closeDetail = output<void>();

  /**
   * Formats a byte count into a human-readable size string.
   *
   * @param value - The value to measure (serialized to JSON).
   * @returns Formatted size string (e.g. "1.2 KB").
   */
  formatSize(value: unknown): string {
    const bytes = new Blob([JSON.stringify(value)]).size;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }
}
