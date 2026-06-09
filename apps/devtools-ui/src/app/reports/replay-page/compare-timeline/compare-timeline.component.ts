import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal
} from '@angular/core';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CompareTraceService } from '../compare-trace.service';

/**
 * Describes the position and identity of a single category marker
 * on a trace timeline track.
 */
export interface TimelineMarkerShape {
  /** Category label derived from the event name prefix. */
  label: string;
  /** Full event name from the trace. */
  eventName: string;
  /** Horizontal position as a percentage of the maximum duration. */
  position: number;
  /** Milliseconds elapsed since the trace started. */
  elapsed: number;
}

/**
 * Displays a collapsible side-by-side timeline comparing two
 * trace executions with category markers and a duration delta.
 */
@Component({
  selector: 'sdux-compare-timeline',
  standalone: true,
  imports: [MatTooltipModule, MatSelect, MatOption],
  templateUrl: './compare-timeline.component.html',
  styleUrl: './compare-timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareTimelineComponent {
  /** Injected comparison service for shared view mode. */
  readonly #compare = inject(CompareTraceService);

  /** Label for the "before" trace row. */
  readonly beforeLabel = input.required<string>();

  /** Label for the "after" trace row. */
  readonly afterLabel = input.required<string>();

  /** Duration of the "before" trace in milliseconds. */
  readonly beforeDuration = input.required<number>();

  /** Duration of the "after" trace in milliseconds. */
  readonly afterDuration = input.required<number>();

  /** Timeline markers for the "before" trace. */
  readonly beforeMarkers = input.required<TimelineMarkerShape[]>();

  /** Timeline markers for the "after" trace. */
  readonly afterMarkers = input.required<TimelineMarkerShape[]>();

  /** All-events timeline markers for the "before" trace. */
  readonly beforeAllMarkers = input.required<TimelineMarkerShape[]>();

  /** All-events timeline markers for the "after" trace. */
  readonly afterAllMarkers = input.required<TimelineMarkerShape[]>();

  /** Diff-only timeline markers for the "before" trace. */
  readonly beforeDiffMarkers = input.required<TimelineMarkerShape[]>();

  /** Diff-only timeline markers for the "after" trace. */
  readonly afterDiffMarkers = input.required<TimelineMarkerShape[]>();

  /** State-only timeline markers for the "before" trace. */
  readonly beforeStateMarkers = input.required<TimelineMarkerShape[]>();

  /** State-only timeline markers for the "after" trace. */
  readonly afterStateMarkers = input.required<TimelineMarkerShape[]>();

  /** Category-filtered timeline markers for the "before" trace. */
  readonly beforeCategoryMarkers = input.required<TimelineMarkerShape[]>();

  /** Category-filtered timeline markers for the "after" trace. */
  readonly afterCategoryMarkers = input.required<TimelineMarkerShape[]>();

  /** Whether the timeline section is expanded. */
  readonly showTimeline = signal(true);

  /** Active timeline view mode (shared with service). */
  readonly viewMode = this.#compare.timelineViewMode;

  /** Markers to display for the "before" track based on view mode. */
  readonly displayBeforeMarkers = computed(() => {
    const mode = this.viewMode();
    if (mode === 'all-events') return this.beforeAllMarkers();
    if (mode === 'diff-only') return this.beforeDiffMarkers();
    if (mode === 'state-only') return this.beforeStateMarkers();
    if (mode === 'category-filtered') return this.beforeCategoryMarkers();
    return this.beforeMarkers();
  });

  /** Markers to display for the "after" track based on view mode. */
  readonly displayAfterMarkers = computed(() => {
    const mode = this.viewMode();
    if (mode === 'all-events') return this.afterAllMarkers();
    if (mode === 'diff-only') return this.afterDiffMarkers();
    if (mode === 'state-only') return this.afterStateMarkers();
    if (mode === 'category-filtered') return this.afterCategoryMarkers();
    return this.afterMarkers();
  });

  /** Maximum duration across both traces (shared time scale). */
  readonly maxDuration = computed(() =>
    Math.max(this.beforeDuration(), this.afterDuration(), 1)
  );

  /** Whether the current view uses per-trace scaling. */
  private readonly isPerTraceScale = computed(
    () => this.viewMode() !== 'category-overview'
  );

  /** Width percentage for the "before" track bar. */
  readonly beforeWidthPercent = computed(() =>
    this.isPerTraceScale()
      ? 100
      : (this.beforeDuration() / this.maxDuration()) * 100
  );

  /** Width percentage for the "after" track bar. */
  readonly afterWidthPercent = computed(() =>
    this.isPerTraceScale()
      ? 100
      : (this.afterDuration() / this.maxDuration()) * 100
  );

  /** Duration delta label between the two traces. */
  readonly durationDelta = computed(() => {
    const before = this.beforeDuration();
    const after = this.afterDuration();
    if (!before && !after) return '';
    const delta = after - before;
    if (delta === 0) return 'same speed';
    return delta > 0 ? `+${delta}ms slower` : `${delta}ms faster`;
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
    const markers = [
      ...this.displayBeforeMarkers(),
      ...this.displayAfterMarkers()
    ];
    const labels = new Set<string>();
    for (const m of markers) labels.add(m.label);
    return labels.size;
  });

  /** Total event count shown in the current view mode. */
  readonly eventCount = computed(
    () => this.displayBeforeMarkers().length + this.displayAfterMarkers().length
  );
}
