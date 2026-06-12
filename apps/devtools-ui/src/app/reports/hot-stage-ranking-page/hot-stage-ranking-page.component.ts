import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import { ExportButtonComponent } from '../../shared/export-button/export-button.component';
import { HelpToggleComponent } from '../../shared/help-toggle/help-toggle.component';
import { ResetButtonComponent } from '../../shared/reset-button/reset-button.component';
import { UpsellNoticeComponent } from '../../shared/upsell-notice/upsell-notice.component';
import { TraceHotStageRankingComponent } from './hot-stage-ranking-trace/trace-hot-stage-ranking.component';

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
    MatTooltipModule,
    ExportButtonComponent,
    HelpToggleComponent,
    ResetButtonComponent,
    TraceHotStageRankingComponent,
    UpsellNoticeComponent
  ],
  templateUrl: './hot-stage-ranking-page.component.html',
  styleUrls: [
    '../scss/reports-common.scss',
    './hot-stage-ranking-page.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotStageRankingPageComponent {
  /** Aggregate service providing trace data. */
  #aggregate = inject(DevtoolsAggregateService);

  /** Registry service providing license state. */
  #registry = inject(DevtoolsRegistryService);

  /** Whether the current license enables pro/enterprise features. */
  readonly isLicensed = this.#registry.isLicensed;

  /** All completed traces from the aggregate service. */
  readonly traces = this.#aggregate.traces;

  /** Available cell keys for filtering. */
  readonly cellKeys = computed(() => {
    const keys = [...this.#aggregate.tracesByCellKey().keys()];
    return keys.sort();
  });

  /** Currently selected cell filter ('all' = no filter). */
  readonly selectedCell = signal<string>('all');

  /** View mode for the hot stage ranking child component. */
  readonly viewMode = signal<'grouped' | 'individual'>('grouped');

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
