import { PipelineValue, VaultErrorShape } from '@sdux-vault/shared';

/** Stub interface representing a read-only reference to Vault state. */
export interface VaultStateRef<T> {
  /** Whether the state is currently loading. */
  isLoading: boolean;
  /** The current pipeline value. */
  value: PipelineValue<T>;
  /** The current error, or null if no error exists. */
  error: VaultErrorShape | null;
  /** Whether the state holds a resolved value. */
  hasValue: boolean;
}
