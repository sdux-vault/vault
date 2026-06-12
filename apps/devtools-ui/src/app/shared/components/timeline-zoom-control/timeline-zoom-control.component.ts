import {
  ChangeDetectionStrategy,
  Component,
  computed,
  model
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ZOOM_LEVELS } from '../../constants/zoom.constant';

/**
 * Renders zoom-in / zoom-out icon buttons that step through
 * predefined zoom levels on a two-way bound zoom signal.
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
  /** Two-way bound zoom multiplier. */
  readonly zoom = model(1);

  /** Current zoom level index within the predefined steps. */
  readonly #zoomIndex = computed(() =>
    ZOOM_LEVELS.findIndex((z) => z.value === this.zoom())
  );

  /** Whether zoom-out (minus) is disabled (already at 1×). */
  readonly canZoomOut = computed(() => this.#zoomIndex() > 0);

  /** Whether zoom-in (plus) is disabled (already at max). */
  readonly canZoomIn = computed(
    () => this.#zoomIndex() < ZOOM_LEVELS.length - 1
  );

  /** Human-readable zoom label. */
  readonly zoomLabel = computed(
    () => ZOOM_LEVELS[this.#zoomIndex()]?.label ?? `${this.zoom() * 100}%`
  );

  /** Step one level out (wider view, less zoom). */
  zoomOut(): void {
    const idx = this.#zoomIndex();
    if (idx > 0) {
      this.zoom.set(ZOOM_LEVELS[idx - 1].value);
    }
  }

  /** Step one level in (narrower view, more zoom). */
  zoomIn(): void {
    const idx = this.#zoomIndex();
    if (idx < ZOOM_LEVELS.length - 1) {
      this.zoom.set(ZOOM_LEVELS[idx + 1].value);
    }
  }
}
