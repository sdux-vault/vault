import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatOption, MatSelect } from '@angular/material/select';
import { CompareTraceService } from '../service/compare-trace.service';

/**
 * Reusable dropdown for selecting the active timeline view mode.
 * Reads and writes the shared `timelineViewMode` signal from
 * {@link CompareTraceService}.
 */
@Component({
  selector: 'sdux-timeline-view-mode-select',
  standalone: true,
  imports: [MatSelect, MatOption],
  templateUrl: './timeline-view-mode-select.component.html',
  styleUrl: './timeline-view-mode-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineViewModeSelectComponent {
  /** Injected comparison service that owns the view mode signal. */
  readonly #compare = inject(CompareTraceService);

  /** Current timeline view mode signal (read/write). */
  readonly viewMode = this.#compare.timelineViewMode;
}
