import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SnapshotDiffService } from '../../../services/snapshot-diff.service';
import type { CandidateSnapshotShape } from '../../../shapes/trace';

/**
 * Renders before/after pipeline candidate snapshots as two stacked tables
 * with cell-level diff highlighting.
 *
 * Delegates all diff computation to SnapshotDiffService for consistency
 * with the JSON diff view.
 *
 * Diff indicators:
 * - Added rows/cells are highlighted green with a `+` indicator.
 * - Removed rows/cells are highlighted red with a `-` indicator.
 * - Modified rows show a `~` indicator with individual cells highlighted.
 * - Unchanged rows have no indicator or highlighting.
 */
@Component({
  selector: 'sdux-state-table-view',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './state-table-view.component.html',
  styleUrl: './state-table-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateTableViewComponent {
  /** Injected diff service for consistent before/after comparison. */
  readonly #diffService = inject(SnapshotDiffService);

  /** The "before" snapshot for diff comparison. */
  readonly before = input.required<CandidateSnapshotShape | null>();

  /** The "after" snapshot for diff comparison. */
  readonly after = input.required<CandidateSnapshotShape | null>();

  /** Computed table diff result from the service. */
  readonly tableDiff = computed(() =>
    this.#diffService.computeTableDiff(
      this.before()?.value,
      this.after()?.value
    )
  );

  /** Formats a cell value for display. */
  formatCell(value: unknown): string {
    if (value === null) return 'null';
    if (value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }
}
