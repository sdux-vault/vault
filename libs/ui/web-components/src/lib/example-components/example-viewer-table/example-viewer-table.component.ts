import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

/**
 * ExampleViewerTableComponent
 * ---------------------------
 * A lightweight, generic, Material-based table viewer used across the
 * ngSDuX documentation and example sandbox.
 *
 * Features
 * --------
 * • Accepts any array of row objects via a **required signal input**
 * • Supports row expansion (master/detail toggle)
 * • Provides a default column layout for common models (id, fullName, etc.)
 * • Easily skinnable and replaceable by consumers
 * • Uses Angular Signals rather than @Input() properties
 *
 * Row Expansion
 * -------------
 * Internally, the component tracks a single expanded row using a `signal<T|null>`.
 * Clicking a row toggles expansion:
 *
 *  - Expanding a row sets it as the active row
 *  - Clicking the same row collapses it
 *  - Only one row may be expanded at a time
 *
 * Inputs
 * ------
 * @input dataSource (required) — array of row data used by MatTable.
 *
 * Methods
 * -------
 * isExpanded(row): boolean
 *    Returns true if the provided row is the currently expanded row.
 *
 * toggle(row): boolean
 *    Expands or collapses the row. Returns true if expanded.
 *
 * getColumnTitle(column): string
 *    Maps internal column identifiers to human-friendly labels.
 *
 * Usage Example
 * -------------
 * ```html
 * <sdux-example-viewer-table [dataSource]="employees" />
 * ```
 *
 * ```ts
 * employees = signal([
 *   { id: 'e1', fullName: 'Alice Wells', role: 'Manager', ... }
 * ]);
 * ```
 */
@Component({
  selector: 'sdux-example-viewer-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './example-viewer-table.component.html',
  styleUrls: ['./example-viewer-table.component.scss']
})
export class ExampleViewerTableComponent<T> {
  /** Required signal input containing the rows displayed by the table. */
  readonly dataSource = input.required<T[]>();

  /** Default displayed columns for common model types. */
  public columnsToDisplay: string[] = [
    'id',
    'fullName',
    'firstName',
    'lastName',
    'role',
    'status'
  ];

  /** Adds an expand column at the start of the table. */
  public columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay];

  /** Internal signal tracking the currently expanded row. */
  private readonly expanded = signal<T | null>(null);

  /** Returns whether the given row is the currently expanded row. */
  isExpanded(row: T): boolean {
    return this.expanded() === row;
  }

  /**
   * Toggles expansion state for a row.
   * @returns `true` if the row is now expanded, otherwise `false`.
   */
  toggle(row: T): boolean {
    const next = this.isExpanded(row) ? null : row;
    this.expanded.set(next);
    return next !== null;
  }

  /**
   * Maps internal column identifiers to user-facing table titles.
   */
  getColumnTitle(column: string): string {
    switch (column) {
      case 'id':
        return 'Id';
      case 'fullName':
        return 'Name';
      case 'firstName':
        return 'First';
      case 'lastName':
        return 'Last';
      case 'role':
        return 'Role';
      case 'status':
        return 'Status';
    }

    return '';
  }
}
