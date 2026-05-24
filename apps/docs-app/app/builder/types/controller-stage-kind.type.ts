export const ControllerStageKindTypes = {
  Controller: 'controller',
  Stage: 'stage',
  Core: 'core'
} as const;

export type ControllerStageKindType =
  (typeof ControllerStageKindTypes)[keyof typeof ControllerStageKindTypes];
