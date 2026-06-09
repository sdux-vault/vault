import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CompareTraceService } from '../compare-trace.service';

/** Predefined zoom levels for the timeline tracks. */
const ZOOM_LEVELS = [1, 1.5, 2, 3, 4, 6] as const;

/**
 * Renders zoom-in / zoom-out icon buttons that step through
 * predefined zoom levels on the shared `timelineZoom` signal.
 */
@Component({
  selector: 'sdux-timeline-zoom-control',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './timeline-zoom-control.component.html',
  styleUrl: './timeline-zoom-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineZoomControlComponent {
  /** Injected comparison service that owns the zoom signal. */
  readonly #compare = inject(CompareTraceService);

  /** Current zoom level index within the predefined steps. */
  readonly #zoomIndex = computed(() =>
    ZOOM_LEVELS.indexOf(
      this.#compare.timelineZoom() as (typeof ZOOM_LEVELS)[number]
    )
  );

  /** Current zoom multiplier value. */
  readonly zoom = this.#compare.timelineZoom;

  /** Whether zoom-out (minus) is disabled (already at 1×). */
  readonly canZoomOut = computed(() => this.#zoomIndex() > 0);

  /** Whether zoom-in (plus) is disabled (already at max). */
  readonly canZoomIn = computed(
    () => this.#zoomIndex() < ZOOM_LEVELS.length - 1
  );

  /** Tooltip showing current zoom percentage. */
  readonly zoomLabel = computed(() => `${this.zoom() * 100}%`);

  /** Step one level out (wider view, less zoom). */
  zoomOut(): void {
    const idx = this.#zoomIndex();
    if (idx > 0) {
      this.#compare.timelineZoom.set(ZOOM_LEVELS[idx - 1]);
    }
  }

  /** Step one level in (narrower view, more zoom). */
  zoomIn(): void {
    const idx = this.#zoomIndex();
    if (idx < ZOOM_LEVELS.length - 1) {
      this.#compare.timelineZoom.set(ZOOM_LEVELS[idx + 1]);
    }
  }
}
