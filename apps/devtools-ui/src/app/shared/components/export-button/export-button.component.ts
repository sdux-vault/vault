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
   * and revokes the object URL after the click. If the data is a
   * flat array of event objects (items have `traceId` and `timestamp`
   * but no nested `events` array), it groups them into trace-shaped
   * objects so all exports share the same format.
   *
   * @param event - The DOM click event; propagation is stopped.
   */
  download(event: Event): void {
    event.stopPropagation();

    const payload = this.normalizePayload(this.data());

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json'
    });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `sdux-${this.filename()}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  /**
   * Detects whether the data is already trace-shaped or flat events.
   * If flat events, groups them by traceId into a consistent trace format.
   *
   * @param data - The raw data array from the component input.
   * @returns The normalized payload ready for JSON serialization.
   */
  private normalizePayload(data: unknown[]): unknown[] {
    if (!data.length) {
      return data;
    }
    const first = data[0] as Record<string, unknown>;
    if ('events' in first && Array.isArray(first['events'])) {
      return data;
    }
    if ('traceId' in first && 'timestamp' in first) {
      return this.groupEventsAsTraces(
        data as { traceId?: string; cell: string; timestamp: number }[]
      );
    }
    return data;
  }

  /**
   * Groups a flat array of event objects by their traceId into
   * trace-shaped wrapper objects with timing metadata.
   *
   * @param events - Flat array of event-like objects with optional traceId.
   * @returns Array of trace objects containing grouped events.
   */
  private groupEventsAsTraces(
    events: { traceId?: string; cell: string; timestamp: number }[]
  ): {
    traceId: string;
    cellKey: string;
    startedAt: number;
    finishedAt: number;
    events: typeof events;
  }[] {
    const grouped = new Map<
      string,
      { cellKey: string; events: typeof events }
    >();
    for (const event of events) {
      const traceId = event.traceId ?? 'unknown';
      const existing = grouped.get(traceId);
      if (existing) {
        existing.events.push(event);
      } else {
        grouped.set(traceId, {
          cellKey: event.cell,
          events: [event]
        });
      }
    }
    return [...grouped.entries()].map(([traceId, group]) => ({
      traceId,
      cellKey: group.cellKey,
      startedAt: group.events[0].timestamp,
      finishedAt: group.events[group.events.length - 1].timestamp,
      events: group.events
    }));
  }
}
