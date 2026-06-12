/**
 * Diff status for a single row in a before/after table comparison.
 * - `added`: Row exists only in the after snapshot.
 * - `removed`: Row exists only in the before snapshot.
 * - `modified`: Row exists in both but has cell-level differences.
 * - `unchanged`: Row is identical in both snapshots.
 */
export type RowDiffStatus = 'added' | 'removed' | 'modified' | 'unchanged';

/**
 * Diff status for a single cell within a row.
 * - `added`: Column exists in this snapshot but not the other.
 * - `removed`: Column exists in the other snapshot but not this one.
 * - `modified`: Value changed between snapshots.
 * - `unchanged`: Value is identical in both snapshots.
 */
export type CellDiffStatus = 'added' | 'removed' | 'modified' | 'unchanged';

/**
 * Represents a row with cell-level diff information for table rendering.
 */
export interface TableDiffRowShape {
  /** Diff status for the entire row. */
  status: RowDiffStatus;

  /** The row data keyed by column name. */
  data: Record<string, unknown>;

  /** Per-cell diff status keyed by column name. */
  cells: Record<string, CellDiffStatus>;
}

/**
 * Complete diff result for a before/after table comparison.
 */
export interface TableDiffResultShape {
  /** Column headers for the before table. */
  beforeColumns: string[];

  /** Column headers for the after table. */
  afterColumns: string[];

  /** Rows for the before table with cell-level diff statuses. */
  beforeRows: TableDiffRowShape[];

  /** Rows for the after table with cell-level diff statuses. */
  afterRows: TableDiffRowShape[];
}
