import { AES256BehaviorOptions } from '../options/aes256-behavior.options';

/**
 * Augments the FeatureCell base shape with optional AES-256 encryption-related APIs.
 */
declare module '@sdux-vault/shared' {
  /** Extends FeatureCellBaseShape with optional AES-256 encryption methods. */
  // eslint-disable-next-line
  interface FeatureCellBaseShape<T> {
    /**
     * Configures the AES-256 secret used by the Feature Cell for encryption operations.
     *
     * @param options - AES-256 behavior configuration options.
     * @returns The FeatureCell instance for fluent chaining.
     */
    setAes256Secret?(options: AES256BehaviorOptions): this;

    /**
     * Generates a cryptographic salt of the specified length.
     *
     * @param length - Byte length of the salt to generate.
     * @returns A Uint8Array containing the generated salt.
     */
    generateSalt?(length: number): Uint8Array;
  }
}

/**
 * Module augmentation marker ensuring the AES-256 extension is included.
 */
export const __with_aes256_extension = true;
