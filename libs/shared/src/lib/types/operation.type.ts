/** Enumeration of pipeline operation modes. */
export const OperationTypes = {
  Merge: 'merge',
  Replace: 'replace',
  Initialize: 'initialize'
} as const;

/** Union type derived from OperationTypes values. */
export type OperationType =
  (typeof OperationTypes)[keyof typeof OperationTypes];
