import { VaultErrorUsageKindTypes } from '../types/error/vault-error-usage-kind.type';
import { VaultUsageError } from './vault-error.usage';

/**
 * Thrown when an eager Promise is passed directly to the state pipeline
 * instead of a deferred factory function.
 */
export class VaultUsagePromiseError extends VaultUsageError {
  /** Creates the error with a descriptive usage-violation message. */
  constructor() {
    const message = `Invalid incoming value: Promise detected.

Promises are eager and may resolve or reject before entering the Vault pipeline.

Use the following instead  a DeferredFactory value

This guarantees the promise is created and executed inside the pipeline.`;

    super(message, VaultErrorUsageKindTypes.Promise);
  }
}
