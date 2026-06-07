import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import { TraceExecutionStatuses } from '../../shapes/trace';

/**
 * Shape representing a single row in the cell dashboard table.
 */
interface CellDashboardRow {
  /** FeatureCell key. */
  cellKey: string;

  /** Total trace count for this cell. */
  traceCount: number;

  /** Average trace duration in milliseconds. */
  avgDuration: number;

  /** Number of failed/orphaned traces. */
  errorCount: number;

  /** Cell health status indicator. */
  status: 'healthy' | 'warning' | 'error';
}

/**
 * Cell Dashboard component.
 *
 * Provides a top-level overview of all registered FeatureCells with
 * summary metric cards and a per-cell breakdown table. Clicking a
 * cell row navigates to the Trace Detail view filtered by that cell.
 */
@Component({
  selector: 'sdux-cell-dashboard',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './cell-dashboard.component.html',
  styleUrls: ['../scss/reports-common.scss', './cell-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellDashboardComponent {
  /** Aggregate service providing trace data. */
  #aggregate = inject(DevtoolsAggregateService);

  /** Registry service providing license state. */
  #registry = inject(DevtoolsRegistryService);

  /** Angular router for cell-row navigation. */
  #router = inject(Router);

  /** Whether the current license enables pro/enterprise features. */
  readonly isLicensed = this.#registry.isLicensed;

  /** All completed traces. */
  readonly traces = this.#aggregate.traces;

  /** Total number of feature cells. */
  readonly cellCount = computed(() => this.#aggregate.tracesByCellKey().size);

  /** Total number of traces across all cells. */
  readonly totalTraces = computed(() => this.traces().length);

  /** Average duration across all traces. */
  readonly avgDuration = computed(() => {
    const traces = this.traces();
    if (traces.length === 0) return 0;
    return (
      traces.reduce((sum, t) => sum + t.metrics.duration, 0) / traces.length
    );
  });

  /** Error rate as a percentage across all traces. */
  readonly errorRate = computed(() => {
    const traces = this.traces();
    if (traces.length === 0) return 0;
    const errors = traces.filter(
      (t) =>
        t.metrics.status === TraceExecutionStatuses.Failed ||
        t.metrics.status === TraceExecutionStatuses.Orphaned
    ).length;
    return (errors / traces.length) * 100;
  });

  /** Denied rate as a percentage across all traces. */
  readonly deniedRate = computed(() => {
    const traces = this.traces();
    if (traces.length === 0) return 0;
    const denied = traces.filter(
      (t) => t.metrics.status === TraceExecutionStatuses.Denied
    ).length;
    return (denied / traces.length) * 100;
  });

  /** Per-cell dashboard rows sorted by trace count descending. */
  readonly rows = computed<CellDashboardRow[]>(() => {
    const cellMap = this.#aggregate.tracesByCellKey();
    const result: CellDashboardRow[] = [];

    for (const [cellKey, traces] of cellMap) {
      const errorCount = traces.filter(
        (t) =>
          t.metrics.status === TraceExecutionStatuses.Failed ||
          t.metrics.status === TraceExecutionStatuses.Orphaned
      ).length;
      const avgDuration =
        traces.length > 0
          ? traces.reduce((sum, t) => sum + t.metrics.duration, 0) /
            traces.length
          : 0;

      let status: CellDashboardRow['status'] = 'healthy';
      if (errorCount > 0) {
        status = errorCount / traces.length > 0.1 ? 'error' : 'warning';
      }

      result.push({
        cellKey,
        traceCount: traces.length,
        avgDuration,
        errorCount,
        status
      });
    }

    return result.sort((a, b) => b.traceCount - a.traceCount);
  });

  /**
   * Navigates to the Trace Detail view filtered by the given cell key.
   */
  navigateToCell(cellKey: string): void {
    this.#router.navigate(['/reports/trace-detail'], {
      queryParams: { cell: cellKey }
    });
  }
}
