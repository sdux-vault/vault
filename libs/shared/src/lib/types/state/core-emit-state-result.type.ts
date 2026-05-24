import { VAULT_NOOP } from '../../constants/vault/vault-noop.constant';

/**
 * Represents the possible result of a core emit operation.
 * This type indicates either an intentional no-op signal or the absence of an emitted state.
 *
 */
export type CoreEmitStateResult = typeof VAULT_NOOP | undefined;
