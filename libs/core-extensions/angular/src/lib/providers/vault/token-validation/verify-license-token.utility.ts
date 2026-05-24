import { PublicKeys } from './public-keys';

/**
 * the License Tier
 */
export type LicenseTier = 'production' | 'basic' | 'development' | 'free';
/**
 * The public key tier
 */
export type PublicKeyTier = 'production' | 'basic' | 'development';

/**
 * Static license verification utility used to validate signed license tokens
 * against tier-specific public keys. Tokens are expected to contain a JSON
 * structure with a `payload` object and a base64-encoded `signature`.
 *
 * The verification process:
 *  - Parses the token payload
 *  - Determines the declared license tier
 *  - Rejects `"free"` tier licenses
 *  - Loads the appropriate PEM-encoded public key for the tier
 *  - Uses `crypto.subtle.verify()` (RSA-SHA256) to validate the signature
 *
 * Verification failures return `false` rather than throwing.
 */
export const VerifyLicenseToken = {
  /**
   * Verifies the supplied signed license token using the public key associated
   * with its declared tier.
   *
   * @param token - A serialized license token containing a payload and
   * base64-encoded RSA signature.
   * @returns A promise resolving to `true` if the signature validates;
   * otherwise `false`.
   */
  verify: async (token: string): Promise<boolean> => {
    try {
      const parsed = JSON.parse(token);
      const payload = JSON.stringify(parsed.payload);
      const signature = Uint8Array.from(atob(parsed.signature), (c) =>
        c.charCodeAt(0)
      );

      const rawTier = (parsed.payload?.type as LicenseTier) || 'free';

      if (rawTier === 'free') {
        return false;
      }

      const tier = rawTier as PublicKeyTier;
      const keyPem = PublicKeys[tier];

      if (!keyPem) return false;

      const key = await importPublicKey(keyPem);

      const verified = await crypto.subtle.verify(
        {
          name: 'RSASSA-PKCS1-v1_5',
          hash: 'SHA-256'
        },
        key,
        signature,
        new TextEncoder().encode(payload)
      );

      return verified;
    } catch {
      return false;
    }
  }
};

/**
 * Imports an RSA public key from PEM format into a WebCrypto `CryptoKey`
 * configured for signature verification.
 *
 * @param pem - A PEM-encoded public key in subjectPublicKeyInfo format.
 * @returns A promise resolving to a usable verification `CryptoKey`.
 */
async function importPublicKey(pem: string) {
  const binaryDer = str2ab(pemToDer(pem));
  return crypto.subtle.importKey(
    'spki',
    binaryDer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256'
    },
    false,
    ['verify']
  );
}

/**
 * Converts a PEM-encoded public key into its raw DER body.
 *
 * @param pem - The PEM string containing header/footer markers.
 * @returns A base64-decoded DER binary string.
 */
function pemToDer(pem: string) {
  const b64 = pem.replace(/-----.*KEY-----/g, '').replace(/\s+/g, '');
  return atob(b64);
}

/**
 * Converts a binary string into an `ArrayBuffer`, suitable for WebCrypto key
 * import operations.
 *
 * @param str - A binary string.
 * @returns An `ArrayBuffer` containing the same byte values.
 */
function str2ab(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length);
  const arr = new Uint8Array(buf);
  for (let i = 0; i < str.length; i++) arr[i] = str.charCodeAt(i);
  return buf;
}
