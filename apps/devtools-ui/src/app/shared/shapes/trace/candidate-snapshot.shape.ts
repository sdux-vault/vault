import type { PipelineStage } from '@sdux-vault/shared';

/**
 * A single pipeline candidate snapshot extracted from a trace event.
 *
 * Each entry represents the in-flight value captured after a pipeline
 * stage completes. Used by the State Diff View to compare values
 * across stages.
 */
export interface CandidateSnapshotShape {
  /** Pipeline stage that produced this snapshot. */
  stage: PipelineStage;

  /** Event ID of the candidate event. */
  eventId: string;

  /** Behavior key that emitted this candidate. */
  behaviorKey: string;

  /** Timestamp of the candidate event. */
  timestamp: number;

  /** Sequence index within the trace (0-based). */
  sequenceIndex: number;

  /** The in-flight candidate value captured after the stage completed. */
  value: unknown;
}
