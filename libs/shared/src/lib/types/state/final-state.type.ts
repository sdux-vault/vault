import { VAULT_STOP } from '../../constants/vault/vault-stop.constant';
import { PipelineUpstreamValue } from '../../types/pipeline/pipeline-upstream-value.type';

/** Union of all terminal pipeline values including the stop sentinel. */
export type FinalState<T> = PipelineUpstreamValue<T> | typeof VAULT_STOP;
