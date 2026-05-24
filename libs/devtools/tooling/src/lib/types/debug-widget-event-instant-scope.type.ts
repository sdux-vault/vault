/** Available instant event scope values for trace output. */
export const DebugWidgetEventInstantScopeTypes = {
  Thread: 't',
  Process: 'p',
  Global: 'g'
} as const;

/** Union of valid instant event scope values. */
export type DebugWidgetEventInstantScopeType =
  (typeof DebugWidgetEventInstantScopeTypes)[keyof typeof DebugWidgetEventInstantScopeTypes];
