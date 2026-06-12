import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SnapshotDiffService } from '../../../services/snapshot-diff.service';

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
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './state-table-view.component.html',
  styleUrl: './state-table-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateTableViewComponent {
  /** Injected diff service for consistent before/after comparison. */
  readonly #diffService = inject(SnapshotDiffService);

  /** Label for the "before" table heading. */
  readonly beforeLabel = input.required<string>();

  /** The "before" value for diff comparison. */
  readonly beforeValue = input.required<unknown>();

  /** Label for the "after" table heading. */
  readonly afterLabel = input.required<string>();

  /** The "after" value for diff comparison. */
  readonly afterValue = input.required<unknown>();

  /** Whether to show only changed rows. */
  readonly showChangedOnly = input(false);

  /** When true, renders only the before table (no after table). */
  readonly singleTable = input(false);

  /** When true, renders only the after table (no before table). */
  readonly afterOnly = input(false);

  /** Emits when the user toggles the changed-only filter. */
  readonly toggleChangedOnly = output<void>();

  /** Whether the table body is collapsed. */
  readonly collapsed = signal(false);

  /** Computed unfiltered table diff result from the service. */
  readonly #rawDiff = computed(() =>
    this.#diffService.computeTableDiff(this.beforeValue(), this.afterValue())
  );

  /** Whether the unfiltered diff has displayable data. */
  readonly hasData = computed(() => {
    const diff = this.#rawDiff();
    return (
      (diff.beforeRows.length > 0 || diff.afterRows.length > 0) &&
      (diff.beforeColumns.length > 0 || diff.afterColumns.length > 0)
    );
  });

  /** Computed table diff result, filtered when showChangedOnly is active. */
  readonly tableDiff = computed(() => {
    const diff = this.#rawDiff();
    if (!this.showChangedOnly()) return diff;

    return {
      ...diff,
      beforeRows: diff.beforeRows.filter((r) => r.status !== 'unchanged'),
      afterRows: diff.afterRows.filter((r) => r.status !== 'unchanged')
    };
  });

  /**
   * After-only table diff: merges removed rows from before into the after
   * table so they appear with removed styling when the before table is hidden.
   */
  readonly afterOnlyDiff = computed(() => {
    const diff = this.tableDiff();
    if (!this.afterOnly()) return diff;

    const removedRows = diff.beforeRows.filter((r) => r.status === 'removed');
    const allColumns = new Set([...diff.afterColumns, ...diff.beforeColumns]);
    const mergedColumns = Array.from(allColumns);

    return {
      ...diff,
      afterColumns: mergedColumns,
      afterRows: [...diff.afterRows, ...removedRows]
    };
  });

  /** Formats a cell value for display. */
  formatCell(value: unknown): string {
    if (value === null) return 'null';
    if (value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }
}
