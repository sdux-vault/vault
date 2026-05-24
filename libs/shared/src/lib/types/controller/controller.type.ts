/** Enumeration of controller category classifications. */
export const ControllerTypes = {
  CoreAbstain: 'coreAbstain',
  Error: 'error',
  License: 'license',
  Policy: 'policy',
  ReplayGlobalError: 'replayGlobalError',
  Stepwise: 'stepwise',
  TabSync: 'tabSync'
} as const;

/** Union type derived from ControllerTypes values. */
export type ControllerType =
  (typeof ControllerTypes)[keyof typeof ControllerTypes];
