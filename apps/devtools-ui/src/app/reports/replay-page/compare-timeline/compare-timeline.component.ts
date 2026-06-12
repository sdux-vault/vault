import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CollapsibleSectionComponent } from '../../../shared/components/collapsible-section/collapsible-section.component';
import { HelpToggleComponent } from '../../../shared/components/help-toggle/help-toggle.component';
import { TimelineZoomControlComponent } from '../../../shared/components/timeline-zoom-control/timeline-zoom-control.component';
import { CompareTraceService } from '../service/compare-trace.service';
import { TimelineViewModeSelectComponent } from '../timeline-view-mode-select/timeline-view-mode-select.component';

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
  imports: [
    MatTooltipModule,
    CollapsibleSectionComponent,
    HelpToggleComponent,
    TimelineViewModeSelectComponent,
    TimelineZoomControlComponent
  ],
  templateUrl: './compare-timeline.component.html',
  styleUrl: './compare-timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareTimelineComponent {
  /** Injected comparison service for shared state. */
  readonly #compare = inject(CompareTraceService);

  /** Label for the "before" trace row. */
  readonly beforeLabel = this.#compare.compareBeforeLabel;

  /** Label for the "after" trace row. */
  readonly afterLabel = this.#compare.compareAfterLabel;

  /** Duration of the "before" trace in milliseconds. */
  readonly beforeDuration = this.#compare.compareBeforeDuration;

  /** Duration of the "after" trace in milliseconds. */
  readonly afterDuration = this.#compare.compareAfterDuration;

  /** Timeline markers for the "before" trace. */
  readonly beforeMarkers = this.#compare.timelineBeforeMarkers;

  /** Timeline markers for the "after" trace. */
  readonly afterMarkers = this.#compare.timelineAfterMarkers;

  /** All-events timeline markers for the "before" trace. */
  readonly beforeAllMarkers = this.#compare.timelineBeforeAllMarkers;

  /** All-events timeline markers for the "after" trace. */
  readonly afterAllMarkers = this.#compare.timelineAfterAllMarkers;

  /** Diff-only timeline markers for the "before" trace. */
  readonly beforeDiffMarkers = this.#compare.timelineBeforeDiffMarkers;

  /** Diff-only timeline markers for the "after" trace. */
  readonly afterDiffMarkers = this.#compare.timelineAfterDiffMarkers;

  /** State-only timeline markers for the "before" trace. */
  readonly beforeStateMarkers = this.#compare.timelineBeforeStateMarkers;

  /** State-only timeline markers for the "after" trace. */
  readonly afterStateMarkers = this.#compare.timelineAfterStateMarkers;

  /** Category-filtered timeline markers for the "before" trace. */
  readonly beforeCategoryMarkers = this.#compare.timelineBeforeCategoryMarkers;

  /** Category-filtered timeline markers for the "after" trace. */
  readonly afterCategoryMarkers = this.#compare.timelineAfterCategoryMarkers;

  /** Whether the timeline section is expanded. */
  readonly showTimeline = signal(true);

  /** Active timeline view mode (shared with service). */
  readonly viewMode = this.#compare.timelineViewMode;

  /** Display label for the current view mode. */
  readonly viewModeLabel = computed(() => {
    switch (this.viewMode()) {
      case 'all-events':
        return 'All Events';
      case 'diff-only':
        return 'Diff-Only Events';
      case 'state-only':
        return 'State Events Only';
      case 'category-filtered':
        return 'Category Filtered';
      default:
        return 'Category Overview';
    }
  });

  /** Zoom multiplier for track width. */
  readonly zoom = this.#compare.timelineZoom;

  /** Tick line interval as a percentage. */
  readonly tickPercent = this.#compare.timelineTickPercent;

  /** Tick interval in ms (zoom-aware). */
  readonly tickInterval = this.#compare.timelineTickInterval;

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

  /** Tick line interval percentage for the "before" track. */
  readonly beforeTickPercent = computed(() => {
    const interval = this.tickInterval();
    return this.isPerTraceScale()
      ? (interval / Math.max(this.beforeDuration(), 1)) * 100
      : (interval / this.maxDuration()) * 100;
  });

  /** Tick line interval percentage for the "after" track. */
  readonly afterTickPercent = computed(() => {
    const interval = this.tickInterval();
    return this.isPerTraceScale()
      ? (interval / Math.max(this.afterDuration(), 1)) * 100
      : (interval / this.maxDuration()) * 100;
  });

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
