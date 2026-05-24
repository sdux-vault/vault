/** Enumeration of state emission event classifications. */
export const StateEmitTypes = {
  IncomingPipeline: 'Incoming Pipeline',
  FinalizePipeline: 'Finalize Pipeline',
  PipelineError: 'Pipeline Error',
  PipelineDestroy: 'Pipeline Destroy',
  PipelineReset: 'Pipeline Reset',
  AbortController: 'Abort Controller',
  DenyController: 'Deny Controller',
  TabSync: 'Tab Sync'
} as const;

/** Union type derived from StateEmitTypes values. */
export type StateEmitType =
  (typeof StateEmitTypes)[keyof typeof StateEmitTypes];
