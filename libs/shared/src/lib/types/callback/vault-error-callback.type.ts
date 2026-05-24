import { StateSnapshotShape } from '../../shapes/state/state-snapshot.shape';
import { VaultErrorShape } from '../../shapes/vault-error.shape';

/**
 * Callback function signature used for observing errors emitted during
 * the FeatureCell error-handling pipeline.
 *
 * An `ErrorCallback` receives the normalized {@link VaultErrorShape} produced by
 * the pipeline and a read-only {@link StateSnapshotShape} representing the
 * FeatureCell’s state at the time the error occurred.
 *
 * This callback type performs no transformation of the pipeline value;
 * implementations are expected to execute side effects only, such as logging
 * or reporting. Returning a value has no effect on pipeline behavior.
 *
 * @typeParam T - The type of the FeatureCell state associated with the callback.
 */
export type VaultErrorCallback<T> = (
  error: VaultErrorShape,
  state: Readonly<StateSnapshotShape<T>>
) => void;
