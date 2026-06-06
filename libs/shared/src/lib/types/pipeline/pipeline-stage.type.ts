/** Enumeration of pipeline stages that produce state-transforming snapshots for DevTools diffing. */
export const PipelineStages = {
  PipelineStart: 'pipeline-start',
  Resolve: 'resolve',
  ComputeMerge: 'compute-merge',
  Operator: 'operator',
  Filter: 'filter',
  Reducer: 'reducer',
  CoreState: 'core-state'
} as const;

/** Union type derived from PipelineStages values. */
export type PipelineStage =
  (typeof PipelineStages)[keyof typeof PipelineStages];
