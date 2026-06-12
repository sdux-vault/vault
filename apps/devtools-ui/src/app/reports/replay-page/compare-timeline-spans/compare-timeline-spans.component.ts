import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CollapsibleSectionComponent } from '../../../shared/collapsible-section/collapsible-section.component';
import { HelpToggleComponent } from '../../../shared/help-toggle/help-toggle.component';
import { TimelineZoomControlComponent } from '../../../shared/timeline-zoom-control/timeline-zoom-control.component';
import { CompareTraceService } from '../service/compare-trace.service';
import { TimelineViewModeSelectComponent } from '../timeline-view-mode-select/timeline-view-mode-select.component';

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
  imports: [
    MatTooltipModule,
    CollapsibleSectionComponent,
    HelpToggleComponent,
    TimelineViewModeSelectComponent,
    TimelineZoomControlComponent
  ],
  templateUrl: './compare-timeline-spans.component.html',
  styleUrl: './compare-timeline-spans.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareTimelineSpansComponent {
  /** Injected comparison service. */
  readonly #compare = inject(CompareTraceService);

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

  /** Zoom multiplier for track width. */
  readonly zoom = this.#compare.timelineZoom;

  /** Tick interval in ms (zoom-aware). */
  readonly tickInterval = this.#compare.timelineTickInterval;

  /** Tick line interval for the "before" track (per-trace duration). */
  readonly beforeTickPercent = computed(() => {
    const interval = this.tickInterval();
    return (interval / Math.max(this.beforeDuration(), 1)) * 100;
  });

  /** Tick line interval for the "after" track (per-trace duration). */
  readonly afterTickPercent = computed(() => {
    const interval = this.tickInterval();
    return (interval / Math.max(this.afterDuration(), 1)) * 100;
  });

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

  /** Tick marks at zoom-aware intervals (drops last if too close to end). */
  readonly tickMarks = computed(() => {
    const max = this.maxDuration();
    const interval = this.tickInterval();
    const marks: { ms: number; position: number }[] = [];
    for (let ms = interval; ms < max; ms += interval) {
      marks.push({ ms, position: (ms / max) * 100 });
    }
    if (marks.length && marks[marks.length - 1].position > 95) {
      marks.pop();
    }
    return marks;
  });
}
