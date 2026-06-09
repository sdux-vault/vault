import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CompareTraceService } from '../compare-trace.service';

/**
 * Describes a horizontal span for a single category on a
 * trace timeline track, from first to last event.
 */
export interface TimelineSpanShape {
  /** Category label derived from the event name prefix. */
  label: string;
  /** Start position as a percentage of the trace duration. */
  startPosition: number;
  /** End position as a percentage of the trace duration. */
  endPosition: number;
  /** Milliseconds elapsed at the first event. */
  startElapsed: number;
  /** Milliseconds elapsed at the last event. */
  endElapsed: number;
  /** Duration of the span in milliseconds. */
  duration: number;
  /** Number of events in this category. */
  eventCount: number;
}

/**
 * Displays a side-by-side timeline comparing two traces using
 * horizontal bars per category showing first→last event spans.
 * Reveals how long each phase took rather than just when it started.
 *
 * Injects `CompareTraceService` directly for all data.
 */
@Component({
  selector: 'sdux-compare-timeline-spans',
  standalone: true,
  imports: [MatTooltipModule, MatSelectModule],
  templateUrl: './compare-timeline-spans.component.html',
  styleUrl: './compare-timeline-spans.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareTimelineSpansComponent {
  /** Injected comparison service. */
  readonly #compare = inject(CompareTraceService);

  /** Active timeline view mode (shared with service). */
  readonly viewMode = this.#compare.timelineViewMode;

  /** Whether the timeline section is expanded. */
  readonly showTimeline = signal(true);

  /** Label for the "before" trace. */
  readonly beforeLabel = computed(() => {
    const labels = this.#compare.traceLabels();
    return labels.get(this.#compare.compareBeforeId()) ?? 'Before';
  });

  /** Label for the "after" trace. */
  readonly afterLabel = computed(() => {
    const labels = this.#compare.traceLabels();
    return labels.get(this.#compare.compareAfterId()) ?? 'After';
  });

  /** Duration of the "before" trace in milliseconds. */
  readonly beforeDuration = this.#compare.compareBeforeDuration;

  /** Duration of the "after" trace in milliseconds. */
  readonly afterDuration = this.#compare.compareAfterDuration;

  /** Category spans for the "before" trace. */
  readonly beforeSpans = this.#compare.timelineBeforeSpans;

  /** Category spans for the "after" trace. */
  readonly afterSpans = this.#compare.timelineAfterSpans;

  /** Duration delta label. */
  readonly durationDelta = this.#compare.compareDurationDelta;

  /** Maximum duration across both traces. */
  readonly maxDuration = this.#compare.timelineMaxDuration;

  /** Percentage change between before and after durations. */
  readonly percentChange = computed(() => {
    const before = this.beforeDuration();
    const after = this.afterDuration();
    if (!before || before === after) return '';
    const pct = Math.round(((after - before) / before) * 100);
    return pct > 0 ? `↑ ${pct}%` : `↓ ${Math.abs(pct)}%`;
  });

  /** Number of distinct categories across both traces. */
  readonly categoryCount = computed(() => {
    const labels = new Set<string>();
    for (const s of this.beforeSpans()) labels.add(s.label);
    for (const s of this.afterSpans()) labels.add(s.label);
    return labels.size;
  });

  /** Width percentage for the "before" track bar. */
  readonly beforeWidthPercent = computed(() => 100);

  /** Width percentage for the "after" track bar. */
  readonly afterWidthPercent = computed(() => 100);

  /**
   * Computes the minimum width for a span as a percentage,
   * ensuring zero-duration spans are still visible.
   *
   * @param span - The span to compute width for.
   * @returns Width as a percentage string, minimum 1%.
   */
  spanWidth(span: TimelineSpanShape): number {
    const width = span.endPosition - span.startPosition;
    return Math.max(width, 1);
  }
}
