import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { ResetButtonComponent } from '../../shared/reset-button/reset-button.component';
import { TraceHotStageRankingComponent } from '../trace-detail-view/hot-stage-ranking/trace-hot-stage-ranking.component';

/**
 * Page-level Hot Stage Ranking report.
 *
 * Aggregates pipeline stage durations across all collected traces,
 * with an optional cell-key filter to scope analysis to a single
 * FeatureCell. Delegates rendering to the shared
 * `TraceHotStageRankingComponent`.
 */
@Component({
  selector: 'sdux-hot-stage-ranking-page',
  standalone: true,
  imports: [
    MatSelectModule,
    ResetButtonComponent,
    TraceHotStageRankingComponent
  ],
  templateUrl: './hot-stage-ranking-page.component.html',
  styleUrl: './hot-stage-ranking-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotStageRankingPageComponent {
  /** Aggregate service providing trace data. */
  #aggregate = inject(DevtoolsAggregateService);

  /** All completed traces from the aggregate service. */
  readonly traces = this.#aggregate.traces;

  /** Available cell keys for filtering. */
  readonly cellKeys = computed(() => {
    const keys = [...this.#aggregate.tracesByCellKey().keys()];
    return keys.sort();
  });

  /** Currently selected cell filter ('all' = no filter). */
  readonly selectedCell = signal<string>('all');

  /** Traces filtered by selected cell. */
  readonly filteredTraces = computed(() => {
    const cell = this.selectedCell();
    const traces = this.traces();

    if (cell !== 'all') {
      return traces.filter((t) => t.cellKey === cell);
    }

    return traces;
  });

  /**
   * Updates the selected cell filter.
   */
  selectCell(cellKey: string): void {
    this.selectedCell.set(cellKey);
  }
}
