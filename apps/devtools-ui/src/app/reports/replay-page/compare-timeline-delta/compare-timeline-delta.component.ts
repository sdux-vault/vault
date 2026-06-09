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
  imports: [MatTooltipModule, MatSelectModule],
  templateUrl: './compare-timeline-delta.component.html',
  styleUrl: './compare-timeline-delta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareTimelineDeltaComponent {
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

  /** Duration delta label. */
  readonly durationDelta = this.#compare.compareDurationDelta;

  /** Delta markers for the elapsed-delta view. */
  readonly deltaMarkers = this.#compare.timelineDeltaMarkers;

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
