import { VaultErrorUsageKindTypes } from '../types/error/vault-error-usage-kind.type';
import { VaultUsageError } from './vault-error.usage';

/**
 * Thrown when a Promise-based state method receives a raw value instead
 * of a factory function that returns a Promise.
 */
export class VaultUsagePromiseFactoryRequiredError extends VaultUsageError {
  /** Creates the error with a descriptive usage-violation message. */
  constructor() {
    const message = `Invalid usage of Promise-based state API.

You called a Promise-specific method (replaceState / mergeState),
but did not provide a function that creates a Promise.

Expected:
• () => Promise<T>

Received:
• A non-function value

Promises are eager and may resolve or reject before entering the Vault pipeline.

Always wrap promises in a function so they are created and executed
inside the pipeline.`;

    super(message, VaultErrorUsageKindTypes.PromiseFactoryRequired);
  }
}
