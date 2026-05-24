import { VAULT_STOP } from '../constants/vault/vault-stop.constant';
import { StateInputType } from './state/state-input.type';

/**
 * Represents the full set of values an interceptor may return to the
 * orchestrator during the interceptor stage.
 *
 * Interceptors may either:
 *
 * - forward the original {@link StateInputType} value unchanged,
 * - replace it with a transformed {@link StateInputType}, or
 * - return the reserved {@link VAULT_STOP} symbol to indicate that
 *   pipeline execution should halt for the current write operation.
 *
 * Returning `VAULT_STOP` instructs the orchestrator to abort further
 * processing of the incoming state while maintaining deterministic
 * pipeline flow. This symbol is treated as an explicit control signal
 * and is not a user-provided state value.
 *
 * @typeParam T - The underlying feature state type being processed.
 */
export type InterceptorStateType<T> = StateInputType<T> | typeof VAULT_STOP;
