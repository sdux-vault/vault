/**
 * Defines the shape of an encrypted state envelope produced by AES-256-GCM encryption.
 * This interface represents the serialized container used to store encrypted payloads along with required metadata for decryption.
 */
export interface EncryptedEnvelopeShape {
  /**
   * Envelope format version number used for forward compatibility.
   */
  v: number;

  /**
   * Base64-encoded initialization vector used during encryption.
   */
  iv: string;

  /**
   * Base64-encoded ciphertext representing the encrypted payload.
   */
  data: string;

  /**
   * Algorithm identifier associated with the encrypted envelope.
   */
  alg: 'AES-256-GCM';
}
