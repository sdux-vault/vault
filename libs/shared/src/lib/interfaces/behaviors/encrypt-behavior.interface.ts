import { BehaviorContext } from '../../contexts/behavior.context';
import { PipelinePersistValue } from '../../types/pipeline/pipeline-persist-value.type';
import { BehaviorContract } from './behavior/behavior.interface';

/**
 * Contract for encryption behaviors that protect persisted state values.
 */
export interface EncryptBehaviorContract<T> extends BehaviorContract<T> {
  /**
   * Encrypts a plain or already-processed state value before persistence.
   *
   * @param ctx - The active behavior context for this pipeline execution.
   * @param current - The current value to encrypt. May be a plain state value
   *                  or `undefined` if persistence should be skipped.
   * @returns The encrypted `PipelinePersistValue<T>`, either synchronously or asynchronously.
   */
  encryptState(
    ctx: BehaviorContext<T>,
    current: PipelinePersistValue<T>
  ): Promise<PipelinePersistValue<T>> | PipelinePersistValue<T>;

  /**
   * Decrypts a value retrieved from storage.
   *
   * @param ctx - The active behavior context associated with this pipeline run.
   * @param encrypted - A persisted value (possibly `undefined`) to decrypt.
   * @returns The decrypted `PipelinePersistValue<T>`, either synchronously or asynchronously.
   */
  decryptState(
    ctx: BehaviorContext<T>,
    encrypted: PipelinePersistValue<T>
  ): Promise<PipelinePersistValue<T>> | PipelinePersistValue<T>;
}
