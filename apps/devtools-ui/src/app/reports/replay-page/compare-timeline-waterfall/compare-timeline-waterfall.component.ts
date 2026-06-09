import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { TimelineMarkerShape } from '../compare-timeline/compare-timeline.component';
import { CompareTraceService } from '../compare-trace.service';

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
  imports: [MatTooltipModule, MatSelectModule],
  templateUrl: './compare-timeline-waterfall.component.html',
  styleUrl: './compare-timeline-waterfall.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareTimelineWaterfallComponent {
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

  /** Maximum duration across both traces. */
  readonly maxDuration = this.#compare.timelineMaxDuration;

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
}
