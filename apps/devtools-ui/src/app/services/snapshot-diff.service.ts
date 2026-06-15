import { Injectable } from '@angular/core';
import type {
  CellDiffStatus,
  TableDiffResultShape,
  TableDiffRowShape
} from '../shared/shapes/trace';

/**
 * Computes row-level and cell-level diffs between two snapshot values
 * for both the diff view and the table view.
 *
 * Accepts the raw `value` from a CandidateSnapshotShape and produces
 * a TableDiffResultShape with per-row and per-cell diff statuses.
 */
@Injectable({ providedIn: 'root' })
export class SnapshotDiffService {
  /**
   * Computes a complete table diff between two candidate snapshot values.
   *
   * @param beforeValue - The raw value from the before snapshot.
   * @param afterValue - The raw value from the after snapshot.
   * @returns A TableDiffResultShape with columns, rows, and cell-level statuses.
   */
  computeTableDiff(
    beforeValue: unknown,
    afterValue: unknown
  ): TableDiffResultShape {
    const beforeRows = this.#toRows(beforeValue);
    const afterRows = this.#toRows(afterValue);
    const beforeColumns = this.#extractColumns(beforeValue);
    const afterColumns = this.#extractColumns(afterValue);

    const diffBefore = this.#diffBeforeRows(
      beforeRows,
      afterRows,
      beforeColumns
    );
    const diffAfter = this.#diffAfterRows(beforeRows, afterRows, afterColumns);

    return {
      beforeColumns,
      afterColumns,
      beforeRows: diffBefore,
      afterRows: diffAfter
    };
  }

  /**
   * Computes diff rows for the before table.
   * Rows beyond the after length are marked as removed.
   * Rows within range are compared cell-by-cell against the after row at the same index.
   */
  #diffBeforeRows(
    beforeRows: Record<string, unknown>[],
    afterRows: Record<string, unknown>[],
    columns: string[]
  ): TableDiffRowShape[] {
    return beforeRows.map((row, index) => {
      if (index >= afterRows.length) {
        const cells: Record<string, CellDiffStatus> = {};
        for (const col of columns) {
          cells[col] = 'removed';
        }
        return { status: 'removed' as const, data: row, cells };
      }

      const afterRow = afterRows[index];
      const cells = this.#diffCells(row, afterRow, columns, 'before');
      const hasChanges = Object.values(cells).some((s) => s !== 'unchanged');
      return {
        status: hasChanges ? ('modified' as const) : ('unchanged' as const),
        data: row,
        cells
      };
    });
  }

  /**
   * Computes diff rows for the after table.
   * Rows beyond the before length are marked as added.
   * Rows within range are compared cell-by-cell against the before row at the same index.
   */
  #diffAfterRows(
    beforeRows: Record<string, unknown>[],
    afterRows: Record<string, unknown>[],
    columns: string[]
  ): TableDiffRowShape[] {
    return afterRows.map((row, index) => {
      if (index >= beforeRows.length) {
        const cells: Record<string, CellDiffStatus> = {};
        for (const col of columns) {
          cells[col] = 'added';
        }
        return { status: 'added' as const, data: row, cells };
      }

      const beforeRow = beforeRows[index];
      const cells = this.#diffCells(row, beforeRow, columns, 'after');
      const hasChanges = Object.values(cells).some((s) => s !== 'unchanged');
      return {
        status: hasChanges ? ('modified' as const) : ('unchanged' as const),
        data: row,
        cells
      };
    });
  }

  /**
   * Computes per-cell diff statuses for a single row.
   *
   * @param thisRow - The row from the current side (before or after).
   * @param otherRow - The corresponding row from the opposite side.
   * @param columns - The column keys to check.
   * @param side - Which side thisRow belongs to.
   * @returns A record of column → CellDiffStatus.
   */
  #diffCells(
    thisRow: Record<string, unknown>,
    otherRow: Record<string, unknown>,
    columns: string[],
    side: 'before' | 'after'
  ): Record<string, CellDiffStatus> {
    const cells: Record<string, CellDiffStatus> = {};

    for (const col of columns) {
      const thisVal = thisRow[col];
      const otherVal = otherRow[col];
      const thisExists = col in thisRow;
      const otherExists = col in otherRow;

      if (thisExists && !otherExists) {
        cells[col] = side === 'before' ? 'removed' : 'added';
      } else if (!thisExists && otherExists) {
        cells[col] = 'unchanged';
      } else if (JSON.stringify(thisVal) !== JSON.stringify(otherVal)) {
        cells[col] = 'modified';
      } else {
        cells[col] = 'unchanged';
      }
    }

    return cells;
  }

  /**
   * Converts a snapshot value to an array of row records.
   */
  #toRows(val: unknown): Record<string, unknown>[] {
    if (Array.isArray(val)) {
      return val.filter(
        (item): item is Record<string, unknown> =>
          item !== null && typeof item === 'object'
      );
    }
    if (val && typeof val === 'object') {
      return Object.entries(val as Record<string, unknown>).map(([k, v]) => ({
        key: k,
        value: v
      }));
    }
    return [];
  }

  /**
   * Extracts column keys from a snapshot value.
   */
  #extractColumns(val: unknown): string[] {
    if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'object') {
      const keys = new Set<string>();
      for (const item of val) {
        if (item && typeof item === 'object') {
          for (const key of Object.keys(item as Record<string, unknown>)) {
            keys.add(key);
          }
        }
      }
      return [...keys];
    }
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      return ['key', 'value'];
    }
    return [];
  }
}
