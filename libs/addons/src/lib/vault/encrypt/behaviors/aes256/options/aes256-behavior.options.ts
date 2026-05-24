/**
 * Defines configuration options for the AES-256 encryption behavior.
 * This interface represents the consumer-supplied contract required to configure encryption and key derivation.
 */
export interface AES256BehaviorOptions {
  /**
   * Secret value used as the basis for AES-256 encryption.
   */
  aes256Secret: string;

  /**
   * Salt value applied during key derivation.
   */
  salt: Uint8Array;

  /**
   * Number of iterations used during key derivation.
   */
  iterations: number;
}
