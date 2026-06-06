import type { PipelineStage } from '../../types/pipeline/pipeline-stage.type';

/**
 * Describes the shape of an in-flight pipeline candidate value captured
 * after a pipeline stage completes. Used exclusively by the State Diff
 * View in DevTools to compare state transformations across stages.
 */
export interface EventCandidateShape<T = unknown> {
  /**
   * The pipeline stage that produced this candidate.
   */
  stage: PipelineStage;

  /**
   * The in-flight pipeline value after the stage completed.
   */
  value: T | undefined;

  /**
   * Whether the candidate carries a defined value.
   */
  hasValue: boolean;
}
