import { StateSnapshotShape, VAULT_NOOP } from '@sdux-vault/shared';

/**
 * Represents the possible result of a core state resolution operation.
 * This type indicates either a resolved state snapshot or an explicit no-op signal.
 *
 */
export type CoreStateResult<T> = StateSnapshotShape<T> | typeof VAULT_NOOP;
