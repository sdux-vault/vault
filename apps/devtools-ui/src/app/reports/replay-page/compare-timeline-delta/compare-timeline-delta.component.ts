import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderSectionComponent } from '../../../shared/components/header-section/header-section.component';
import { HelpToggleComponent } from '../../../shared/components/help-toggle/help-toggle.component';
import { TimelineZoomControlComponent } from '../../../shared/components/timeline-zoom-control/timeline-zoom-control.component';
import { CompareTraceService } from '../service/compare-trace.service';
import { TimelineViewModeSelectComponent } from '../timeline-view-mode-select/timeline-view-mode-select.component';

/**
 * Describes a delta marker on the elapsed-delta timeline,
 * showing how much earlier or later an event fired in the
 * after trace compared to the before trace.
 */
export interface TimelineDeltaMarkerShape {
  /** Category label derived from the event name prefix. */
  label: string;
  /** Full event name from the trace. */
  eventName: string;
  /** Horizontal position as a percentage (by event index). */
  position: number;
  /** Timing delta in milliseconds (positive = slower, negative = faster). */
  delta: number;
  /** Delta normalized to [-1, 1] range for visual scaling. */
  normalizedDelta: number;
  /** Milliseconds elapsed in the before trace. */
  beforeElapsed: number;
  /** Milliseconds elapsed in the after trace. */
  afterElapsed: number;
}

/**
 * Displays a single-bar timeline plotting the elapsed timing
 * delta between corresponding events in two traces.
 * Positive deltas (slower) are colored red above the center line;
 * negative deltas (faster) are colored green below.
 *
 * Injects `CompareTraceService` directly for all data.
 */
@Component({
  selector: 'sdux-compare-timeline-delta',
  standalone: true,
  imports: [
    MatTooltipModule,
    HeaderSectionComponent,
    HelpToggleComponent,
    TimelineViewModeSelectComponent,
    TimelineZoomControlComponent
  ],
  templateUrl: './compare-timeline-delta.component.html',
  styleUrl: './compare-timeline-delta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareTimelineDeltaComponent {
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

  /** Duration delta label. */
  readonly durationDelta = this.#compare.compareDurationDelta;

  /** Delta markers for the elapsed-delta view. */
  readonly deltaMarkers = this.#compare.timelineDeltaMarkers;

  /** Maximum duration across both traces. */
  readonly maxDuration = this.#compare.timelineMaxDuration;

  /** Zoom multiplier for track width. */
  readonly zoom = this.#compare.timelineZoom;

  /** Tick line interval as a percentage. */
  readonly tickPercent = this.#compare.timelineTickPercent;

  /** Tick interval in ms (zoom-aware). */
  readonly tickInterval = this.#compare.timelineTickInterval;

  /** Percentage change between before and after durations. */
  readonly percentChange = computed(() => {
    const before = this.beforeDuration();
    const after = this.afterDuration();
    if (!before || before === after) return '';
    const pct = Math.round(((after - before) / before) * 100);
    return pct > 0 ? `↑ ${pct}%` : `↓ ${Math.abs(pct)}%`;
  });

  /** Maximum absolute delta across all markers. */
  readonly maxAbsDelta = computed(() => {
    let max = 0;
    for (const m of this.deltaMarkers()) {
      max = Math.max(max, Math.abs(m.delta));
    }
    return max;
  });

  /** Number of events that are faster in the after trace. */
  readonly fasterCount = computed(
    () => this.deltaMarkers().filter((m) => m.delta < 0).length
  );

  /** Number of events that are slower in the after trace. */
  readonly slowerCount = computed(
    () => this.deltaMarkers().filter((m) => m.delta > 0).length
  );

  /** Number of events with no timing change. */
  readonly sameCount = computed(
    () => this.deltaMarkers().filter((m) => m.delta === 0).length
  );

  /** Total marker count. */
  readonly markerCount = computed(() => this.deltaMarkers().length);

  /** Tick marks at zoom-aware intervals with their percentage position (drops last if too close to end). */
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

  /**
   * Computes the visual height of a delta bar as a percentage
   * of the half-track height, based on normalized delta.
   *
   * @param marker - The delta marker.
   * @returns Height as a percentage (0-100).
   */
  barHeight(marker: TimelineDeltaMarkerShape): number {
    return Math.max(Math.abs(marker.normalizedDelta) * 45, 2);
  }

  /**
   * Builds the tooltip text for a delta marker.
   *
   * @param marker - The delta marker.
   * @returns Tooltip string with timing details.
   */
  markerTooltip(marker: TimelineDeltaMarkerShape): string {
    const direction =
      marker.delta > 0
        ? `+${marker.delta}ms slower`
        : marker.delta < 0
          ? `${marker.delta}ms faster`
          : 'same timing';
    return `${marker.eventName}: ${direction} (before: +${marker.beforeElapsed}ms, after: +${marker.afterElapsed}ms)`;
  }
}
