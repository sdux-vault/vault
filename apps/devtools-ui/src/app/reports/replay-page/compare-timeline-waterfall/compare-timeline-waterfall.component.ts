import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { TimelineMarkerShape } from '../compare-timeline/compare-timeline.component';
import { CompareTraceService } from '../compare-trace.service';
import { TimelineViewModeSelectComponent } from '../timeline-view-mode-select/timeline-view-mode-select.component';
import { TimelineZoomControlComponent } from '../timeline-zoom-control/timeline-zoom-control.component';

/**
 * Describes a single category row in the waterfall view,
 * containing before and after event markers.
 */
export interface WaterfallCategoryShape {
  /** Category label (e.g. lifecycle, controller, stage). */
  label: string;
  /** Event markers from the before trace. */
  beforeMarkers: TimelineMarkerShape[];
  /** Event markers from the after trace. */
  afterMarkers: TimelineMarkerShape[];
  /** Total number of events across both traces. */
  totalEvents: number;
}

/**
 * Displays a waterfall timeline with one row per event category.
 * Events from both before and after traces are plotted within
 * each row using different colors, on a shared time scale.
 * Closer to a flame chart than a two-bar comparison.
 *
 * Injects `CompareTraceService` directly for all data.
 */
@Component({
  selector: 'sdux-compare-timeline-waterfall',
  standalone: true,
  imports: [
    MatTooltipModule,
    TimelineViewModeSelectComponent,
    TimelineZoomControlComponent
  ],
  templateUrl: './compare-timeline-waterfall.component.html',
  styleUrl: './compare-timeline-waterfall.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareTimelineWaterfallComponent {
  /** Whether the help section is visible. */
  readonly showHelp = signal(false);

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

  /** Maximum duration across both traces. */
  readonly maxDuration = this.#compare.timelineMaxDuration;

  /** Zoom multiplier for track width. */
  readonly zoom = this.#compare.timelineZoom;

  /** Tick line interval as a percentage (100ms per tick on shared scale). */
  readonly tickPercent = this.#compare.timelineTickPercent;

  /** Tick interval in ms (zoom-aware). */
  readonly tickInterval = this.#compare.timelineTickInterval;

  /** Waterfall category rows. */
  readonly categories = this.#compare.timelineWaterfallCategories;

  /** Percentage change between before and after durations. */
  readonly percentChange = computed(() => {
    const before = this.beforeDuration();
    const after = this.afterDuration();
    if (!before || before === after) return '';
    const pct = Math.round(((after - before) / before) * 100);
    return pct > 0 ? `↑ ${pct}%` : `↓ ${Math.abs(pct)}%`;
  });

  /** Number of distinct categories. */
  readonly categoryCount = computed(() => this.categories().length);

  /** Total event count across all categories. */
  readonly totalEvents = computed(() => {
    let total = 0;
    for (const cat of this.categories()) total += cat.totalEvents;
    return total;
  });

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
}
