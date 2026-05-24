import { VAULT_CLEAR_STATE } from '../../constants/vault/vault-clear-state.constant';
import { VAULT_CONTINUE } from '../../constants/vault/vault-continue.constant';
import { VAULT_NOOP } from '../../constants/vault/vault-noop.constant';

/** Union of all valid upstream values that a pipeline stage may produce. */
export type PipelineUpstreamValue<T> =
  | T
  | undefined
  | typeof VAULT_NOOP
  | typeof VAULT_CLEAR_STATE
  | typeof VAULT_CONTINUE;
