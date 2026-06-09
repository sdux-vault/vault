import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

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
  imports: [MatTooltipModule],
  templateUrl: './compare-timeline.component.html',
  styleUrl: './compare-timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareTimelineComponent {
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

  /** Whether the timeline section is expanded. */
  readonly showTimeline = signal(true);

  /** Maximum duration across both traces (shared time scale). */
  readonly maxDuration = computed(() =>
    Math.max(this.beforeDuration(), this.afterDuration(), 1)
  );

  /** Width percentage for the "before" track bar. */
  readonly beforeWidthPercent = computed(
    () => (this.beforeDuration() / this.maxDuration()) * 100
  );

  /** Width percentage for the "after" track bar. */
  readonly afterWidthPercent = computed(
    () => (this.afterDuration() / this.maxDuration()) * 100
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
}
