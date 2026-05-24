import { VaultErrorShape } from '../../shapes/vault-error.shape';

/**
 * Normalizes any thrown error into a canonical `VaultError` structure.
 *
 * This ensures that all errors—HTTP, runtime, string, or unknown—
 * are represented consistently throughout the Vault error pipeline.
 *
 * @param err - The raw thrown value.
 * @param featureCellKey - the origination of the error
 * @returns A fully normalized `VaultError`.
 */
export function createVaultError(
  err: unknown,
  featureCellKey: string
): VaultErrorShape {
  const timestamp = Date.now();

  // -----------------------------------------
  // Standard JS Error
  // -----------------------------------------
  if (err instanceof Error) {
    return {
      message: err.message || 'Unexpected error',
      details: err.stack,
      raw: err,
      timestamp,
      featureCellKey
    };
  }

  // -----------------------------------------
  // String error
  // -----------------------------------------
  if (typeof err === 'string') {
    return {
      message: err,
      details: err,
      raw: err,
      timestamp,
      featureCellKey
    };
  }

  // -----------------------------------------
  // Fallback: unknown error
  // -----------------------------------------
  return {
    message: 'Unexpected error',
    details: err,
    raw: err,
    timestamp,
    featureCellKey
  };
}
