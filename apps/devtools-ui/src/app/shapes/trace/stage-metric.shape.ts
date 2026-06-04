import type { EventType, VaultErrorShape } from '@sdux-vault/shared';

/**
 * Timing and metadata for a single matched start/end boundary pair
 * within a trace execution.
 */
export interface StageMetricShape {
  /** Stage name extracted from the event name (e.g. `resolve`, `filter`). */
  name: string;

  /** The behavior or controller key that emitted this stage. */
  behaviorKey: string;

  /** Timestamp when the start boundary event was received. */
  startedAt: number;

  /** Timestamp when the end boundary event was received. */
  finishedAt: number;

  /** Wall-clock duration in milliseconds (`finishedAt - startedAt`). */
  duration: number;

  /** Event category that emitted this stage. */
  type: EventType;

  /** Payload carried by the end boundary event, if any. */
  payload?: unknown;

  /** Error attached to the stage, if the stage errored. */
  error?: VaultErrorShape;
}
