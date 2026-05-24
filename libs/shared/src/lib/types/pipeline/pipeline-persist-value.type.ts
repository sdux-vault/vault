/**
 * Represents the value passed into persistence behaviors.
 *
 * A `PipelinePersistValue<T>` may be:
 * - `T` — the final, post-encryption state ready to be persisted
 * - `undefined` — indicating that no value should be written to storage
 *
 * Unlike upstream pipeline values, persistence values never include
 * `VAULT_NOOP`, because no-op handling is completed before the persistence
 * stage begins.
 *
 * @typeParam T - The decrypted/plain state type handled by persistence behaviors.
 */
export type PipelinePersistValue<T> = T | undefined;
