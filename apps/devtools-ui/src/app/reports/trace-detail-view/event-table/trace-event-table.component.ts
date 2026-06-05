import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EventShape } from '@sdux-vault/shared';
import type { TraceExecutionShape } from '../../../shapes/trace';

/**
 * Trace Event Table component.
 *
 * Renders the ordered list of events for a single trace with columns
 * for sequence number, event name, boundary, delta/elapsed time, and
 * state/payload/error indicators. Clicking a row emits the event for
 * display in a detail panel.
 */
@Component({
  selector: 'sdux-trace-event-table',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './trace-event-table.component.html',
  styleUrl: './trace-event-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TraceEventTableComponent {
  /** The trace whose events are displayed. */
  readonly trace = input.required<TraceExecutionShape>();

  /** Emitted when an event row is clicked. */
  readonly eventSelected = output<EventShape>();

  /** Currently selected event ID for row highlighting. */
  readonly selectedEventId = signal<string | null>(null);

  /**
   * Computes the delta time from the previous event.
   */
  deltaMs(event: EventShape, index: number): string {
    if (index === 0) {
      return '0.0';
    }
    const prev = this.trace().events[index - 1];
    const delta = event.timestamp - prev.timestamp;
    return delta.toFixed(1);
  }

  /**
   * Computes the total elapsed time from trace start.
   */
  elapsedMs(event: EventShape): string {
    const elapsed = event.timestamp - this.trace().startedAt;
    return elapsed.toFixed(1);
  }

  /**
   * Formats an event name for display by dropping the boundary segment.
   * `stage:end:reducer` becomes `stage reducer`.
   */
  eventDisplayName(event: EventShape): string {
    const parts = event.name.split(':');
    if (parts.length >= 3) {
      return `${parts[0]} ${parts.slice(2).join(':')}`;
    }
    return event.name;
  }

  /**
   * Extracts the behavior key from an event for display.
   */
  eventBehaviorKey(event: EventShape): string {
    return event.behaviorKey ?? '';
  }

  /**
   * Determines if an event carries a state snapshot.
   */
  hasState(event: EventShape): boolean {
    return event.state?.hasValue === true;
  }

  /**
   * Determines if an event carries a payload.
   */
  hasPayload(event: EventShape): boolean {
    return event.payload !== undefined && event.payload !== null;
  }

  /**
   * Determines if an event carries an error.
   */
  hasError(event: EventShape): boolean {
    return event.error !== undefined && event.error !== null;
  }

  /**
   * Selects an event row and emits the event.
   */
  selectEvent(event: EventShape): void {
    const newId = this.selectedEventId() === event.id ? null : event.id;
    this.selectedEventId.set(newId);
    this.eventSelected.emit(event);
  }
}
