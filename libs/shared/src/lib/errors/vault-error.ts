import {
  VaultErrorKindType,
  VaultErrorKindTypes
} from '../types/error/vault-error-kind.type';
import {
  VaultErrorNameType,
  VaultErrorNameTypes
} from '../types/error/vault-error-name.type';

/**
 * Base error class for all Vault-specific errors. Extends the native Error
 * with a typed name and kind for structured error classification.
 */
export class VaultError extends Error {
  /** Classification kind used to categorize this error in diagnostics. */
  readonly kind: VaultErrorKindType;

  /**
   * Creates a new VaultError instance with prototype chain correction.
   *
   * @param message - Human-readable description of the error.
   * @param name - Typed error name used for identification.
   * @param kind - Error kind used for diagnostic classification.
   */
  constructor(
    message: string,
    name: VaultErrorNameType = VaultErrorNameTypes.VaultError,
    kind: VaultErrorKindType = VaultErrorKindTypes.VaultError
  ) {
    super(message);

    this.name = name;
    this.kind = kind;

    // Required for proper instanceof checks in TS / ES5 targets
    Object.setPrototypeOf(this, new.target.prototype);

    // Optional but nice: clean stack trace
    // eslint-disable-next-line
    const anyError = Error as any;
    if (typeof anyError.captureStackTrace === 'function') {
      anyError.captureStackTrace(this, new.target);
    }
  }
}
