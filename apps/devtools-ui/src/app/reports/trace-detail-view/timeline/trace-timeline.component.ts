import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { TraceExecutionShape } from '../../../shapes/trace';
import { TraceExecutionStatuses } from '../../../shapes/trace';

/**
 * Trace Timeline visualization component.
 *
 * Renders completed traces as horizontal timeline bars with status
 * indicators, duration labels, and a status legend. Receives
 * filtered traces from the parent and manages its own selection
 * state.
 */
@Component({
  selector: 'sdux-trace-timeline',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './trace-timeline.component.html',
  styleUrl: './trace-timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TraceTimelineComponent {
  /** Filtered traces to render in the timeline. */
  readonly traces = input.required<TraceExecutionShape[]>();

  /** Currently selected trace ID within the timeline. */
  readonly selectedTraceId = signal<string | null>(null);

  /** Emitted when a trace bar is toggled. */
  readonly traceToggled = output<string>();

  /** Time window boundaries for the timeline bar visualization. */
  readonly timeWindow = computed(() => {
    const traces = this.traces();
    if (traces.length === 0) return { min: 0, max: 1 };

    const min = Math.min(...traces.map((t) => t.startedAt));
    const max = Math.max(...traces.map((t) => t.finishedAt || t.startedAt));
    const span = max - min || 1;

    return { min, max: min + span };
  });

  /**
   * Resolves a status label for display.
   */
  statusLabel(trace: TraceExecutionShape): string {
    switch (trace.metrics.status) {
      case TraceExecutionStatuses.Success:
        return '✓';
      case TraceExecutionStatuses.Failed:
        return '✗';
      case TraceExecutionStatuses.Denied:
        return '⊘';
      case TraceExecutionStatuses.Orphaned:
        return '⚠';
      case TraceExecutionStatuses.Aborted:
        return '↺';
      default:
        return '?';
    }
  }

  /**
   * Resolves a CSS class for the trace status.
   */
  statusClass(trace: TraceExecutionShape): string {
    switch (trace.metrics.status) {
      case TraceExecutionStatuses.Success:
        return 'status-success';
      case TraceExecutionStatuses.Failed:
        return 'status-failed';
      case TraceExecutionStatuses.Denied:
        return 'status-denied';
      case TraceExecutionStatuses.Orphaned:
        return 'status-orphaned';
      case TraceExecutionStatuses.Aborted:
        return 'status-aborted';
      default:
        return '';
    }
  }

  /**
   * Computes the left offset percentage for a trace bar in the timeline.
   */
  timelineLeft(trace: TraceExecutionShape): number {
    const { min, max } = this.timeWindow();
    return ((trace.startedAt - min) / (max - min)) * 100;
  }

  /**
   * Computes the width percentage for a trace bar in the timeline.
   */
  timelineWidth(trace: TraceExecutionShape): number {
    const { min, max } = this.timeWindow();
    const duration = (trace.finishedAt || trace.startedAt) - trace.startedAt;
    const width = (duration / (max - min)) * 100;
    return Math.max(width, 0.5);
  }

  /**
   * Toggles a trace selection and emits the trace ID.
   */
  toggleTrace(traceId: string): void {
    this.selectedTraceId.set(
      this.selectedTraceId() === traceId ? null : traceId
    );
    this.traceToggled.emit(traceId);
  }
}
