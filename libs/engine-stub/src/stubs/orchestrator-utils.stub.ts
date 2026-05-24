import { FinalState, isVaultNoop, VAULT_STOP } from '@sdux-vault/shared';

/**
 * Checks whether the pipeline value is a stop signal.
 *
 * @param current - The final state value to check.
 * @returns True if the value equals VAULT_STOP.
 */
const isSignalStop = <T>(current: FinalState<T>): boolean => {
  return current === VAULT_STOP;
};

/**
 * Determines whether a pipeline value is terminal and should halt processing.
 *
 * @param current - The final state value to evaluate.
 * @returns True if the value is a NOOP or stop signal.
 */
export const isPipelineTerminal = <T>(current: FinalState<T>): boolean =>
  isVaultNoop(current) || isSignalStop(current);
