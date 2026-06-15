/**
 * Defines configuration options for the AES-256 encryption behavior.
 * This interface represents the consumer-supplied contract required to configure encryption and key derivation.
 */
export interface AES256BehaviorOptions {
  /**
   * Secret value used as the basis for AES-256 encryption.
   * Must be a non-empty string.
   */
  aes256Secret: string;

  /**
   * Salt value applied during PBKDF2 key derivation.
   * Must be a `Uint8Array` of at least 16 bytes.
   */
  salt: Uint8Array;

  /**
   * Number of PBKDF2 iterations used during key derivation.
   * Must be an integer between 100,000 and 5,000,000.
   */
  iterations: number;
}
