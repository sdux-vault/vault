import { StateEmitType, StateEmitTypes } from '@sdux-vault/shared';

/**
 * Set of emission types that must not be broadcast to other tabs.
 * Destroy is tab-local teardown. Incoming, error, abort, and deny
 * are intermediate or tab-local states that should not propagate.
 * Reset is broadcast so that other tabs also clear their state.
 */
export const NON_BROADCAST_TYPES = new Set<StateEmitType>([
  StateEmitTypes.PipelineDestroy,
  StateEmitTypes.IncomingPipeline,
  StateEmitTypes.PipelineError,
  StateEmitTypes.AbortController,
  StateEmitTypes.DenyController
]);

/**
 * Union of state emission types excluded from cross-tab broadcasting.
 */
export type NonBroadcastStateEmitType =
  typeof NON_BROADCAST_TYPES extends Set<infer U> ? U : never;
