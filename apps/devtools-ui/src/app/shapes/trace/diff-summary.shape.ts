/**
 * Summary of differences between two candidate snapshots
 * in the State Diff View.
 */
export interface DiffSummaryShape {
  /** Number of properties whose value changed between snapshots. */
  modified: number;

  /** Number of properties present in the after snapshot but absent in the before. */
  added: number;

  /** Number of properties present in the before snapshot but absent in the after. */
  removed: number;
}
