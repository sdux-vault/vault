/** A single zoom level with its numeric multiplier and display label. */
export interface ZoomLevelShape {
  /** Numeric zoom multiplier (e.g. 1, 1.5, 2). */
  readonly value: number;

  /** Human-readable label (e.g. '100%', '150%'). */
  readonly label: string;
}
