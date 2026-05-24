import {
  LicensingAbstract,
  VAULT_LICENSE_ID,
  verifyLicensePayload
} from '@sdux-vault/engine';
import {
  BehaviorClassContext,
  BehaviorContext,
  BehaviorType,
  BehaviorTypes,
  defineBehaviorKey,
  EncryptBehaviorContract,
  FeatureCellBaseShape,
  PipelinePersistValue,
  safeStringify,
  VaultBehavior,
  vaultDebug,
  VaultEncryptionIntegrityError,
  vaultWarn
} from '@sdux-vault/shared';
import { AES256BehaviorOptions } from './options/aes256-behavior.options';
import { EncryptedEnvelopeShape } from './shapes/encrypted-envelope.shape';

/**
 * Numeric version identifier applied to encrypted payload envelopes.
 */
const VAULT_CRYPTO_VERSION = 1;

/**
 * Additional authenticated data version tag embedded in AES-GCM ciphertexts.
 */
const VAULT_AAD_VERSION = 'sdux-vault:aes256-gcm:v1';

/**
 * Minimum allowed iteration count for key derivation.
 */
const MIN_ITERATIONS = 100_000;

/**
 * Maximum allowed iteration count for key derivation.
 */
const MAX_ITERATIONS = 5_000_000;

/**
 * Recommended upper bound for base64-encoded encrypted payload size.
 */
const MAX_RECOMMENDED_B64 = 5_000_000;

/**
 * Provides access to the platform WebCrypto implementation.
 */
export const cryptoPlatform = {
  /**
   * Returns the active WebCrypto provider.
   */
  getWebCrypto(): Crypto {
    return globalThis.crypto;
  }
};

/**
 * AES-256-GCM encryption behavior that encrypts and decrypts persisted state values.
 * This behavior derives a symmetric encryption key from consumer-supplied configuration and applies encryption during persistence and decryption during restoration.
 */
@VaultBehavior({
  type: BehaviorTypes.Encrypt,
  key: defineBehaviorKey('Encrypt', 'Aes256'),
  critical: true,
  wantsConfig: true,
  configKey: 'setAes256Secret',
  needsLicense: true,
  licenseId: VAULT_LICENSE_ID
})
export class withAes256EncryptBehavior<T>
  extends LicensingAbstract<T>
  implements EncryptBehaviorContract<T>
{
  /**
   * Static metadata describing this behavior type.
   */
  static readonly type: BehaviorType;

  /**
   * Indicates whether this behavior is critical.
   */
  static readonly critical: boolean;

  /**
   * Indicates whether this behavior requires configuration.
   */
  static readonly wantsConfig: boolean;

  /**
   * Configuration key used to supply behavior options.
   */
  static readonly configKey: string;

  /**
   * License identifier required by this behavior.
   */
  static readonly licenseId: string;

  /**
   * Installs fluent encryption APIs onto a Feature Cell instance.
   *
   * @param cell Feature Cell instance being extended.
   * @param behaviorConfigs Configuration map used to store behavior options.
   */
  static installFluentApi<T>(
    cell: FeatureCellBaseShape<T>,
    behaviorConfigs: Map<string, unknown>
  ) {
    cell.setAes256Secret = function (options: AES256BehaviorOptions) {
      behaviorConfigs.set(withAes256EncryptBehavior.configKey, options);
      return this;
    };

    cell.generateSalt = function (length = 16): Uint8Array {
      if (!cryptoPlatform.getWebCrypto()?.getRandomValues) {
        throw new Error('[vault] Secure random generator not available');
      }

      if (length < 16) {
        throw new Error('[vault] Salt must be at least 16 bytes');
      }

      return cryptoPlatform
        .getWebCrypto()
        .getRandomValues(new Uint8Array(length));
    };
  }

  /**
   * Behavior type identifier used by the orchestrator.
   */
  readonly type = withAes256EncryptBehavior.type;

  /**
   * Indicates whether this behavior instance is critical.
   */
  readonly critical = withAes256EncryptBehavior.critical;

  /**
   * Unique key identifying this behavior instance.
   */
  readonly key: string;

  /**
   * Cached cryptographic key derived from the configured secret.
   */
  #cryptoKey!: CryptoKey;

  /**
   * Promise used to coordinate one-time key initialization.
   */
  #initPromise?: Promise<void>;

  /**
   * Resolved encryption configuration options.
   */
  readonly #options: AES256BehaviorOptions;

  /**
   * Creates a new AES-256 encryption behavior instance.
   *
   * @param key Unique behavior identifier assigned by the factory.
   * @param behaviorCtx Behavior context supplying configuration and hooks.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    super(behaviorCtx);

    this.key = key;
    this.#options = behaviorCtx.behaviorConfig as AES256BehaviorOptions;

    if (!this.#options) {
      throw new Error(
        '[vault] AES256Encrypt behavior requires configuration via setAes256Secret()'
      );
    }

    if (!this.#options.aes256Secret) {
      throw new Error('[vault] AES256Encrypt behavior requires aes256Secret');
    }

    if (
      typeof this.#options.aes256Secret !== 'string' ||
      !this.#options.aes256Secret.trim()
    ) {
      vaultDebug(
        `${this.key} setAes256Secret must be a string. The secret is "${this.#options.aes256Secret}".`
      );
      throw new Error('[vault] Secret must be a non-empty string.');
    }

    if (
      !cryptoPlatform.getWebCrypto()?.subtle ||
      !cryptoPlatform.getWebCrypto().getRandomValues
    ) {
      throw new Error(
        '[vault] WebCrypto API not available. AES-256 requires secure crypto support.'
      );
    }

    if (
      !(this.#options.salt instanceof Uint8Array) ||
      this.#options.salt.length < 16
    ) {
      throw new Error(
        '[vault] AES-256 salt must be a Uint8Array of at least 16 bytes'
      );
    }

    if (
      !Number.isInteger(this.#options.iterations) ||
      this.#options.iterations < MIN_ITERATIONS ||
      this.#options.iterations > MAX_ITERATIONS
    ) {
      throw new Error(
        `[vault] AES-256 iterations must be between ${MIN_ITERATIONS} and ${MAX_ITERATIONS}`
      );
    }

    verifyLicensePayload(this.behaviorCtx.licensePayload as string).then(
      (valid: boolean) => this.validateLicense(valid)
    );
  }

  /**
   * Encrypts a persisted state value using AES-256-GCM.
   *
   * @param _ctx Behavior execution context.
   * @param current Plain state value to encrypt.
   * @returns Encrypted state envelope or the original value when nullish.
   */
  async encryptState(
    _ctx: BehaviorContext<T>,
    current: PipelinePersistValue<T>
  ): Promise<PipelinePersistValue<T>> {
    try {
      vaultDebug(`${this.key} encryptState called.`);
      if (current === undefined || current === null) {
        vaultDebug(
          `${this.key} encryptState skipped - not a valid plain state. The incoming value "${current}". "${current}" returned.`
        );
        return current;
      }

      await this.#ensureSecretInitialized();

      const iv = cryptoPlatform
        .getWebCrypto()
        .getRandomValues(new Uint8Array(12));
      const additionalData = new TextEncoder().encode(VAULT_AAD_VERSION);
      const encoded = new TextEncoder().encode(JSON.stringify(current));
      const encrypted = await cryptoPlatform
        .getWebCrypto()
        .subtle.encrypt(
          { name: 'AES-GCM', iv, additionalData },
          this.#cryptoKey,
          encoded
        );

      const envelope: EncryptedEnvelopeShape = {
        v: VAULT_CRYPTO_VERSION,
        alg: 'AES-256-GCM',
        iv: this.#abToBase64(iv),
        data: this.#abToBase64(encrypted)
      };

      return envelope as unknown as PipelinePersistValue<T>;
    } catch (err) {
      vaultDebug(
        `[vault] ${this.key} AES encrypt failed: ${safeStringify(err)}.`
      );
      throw err;
    }
  }

  /**
   * Decrypts an encrypted AES-256-GCM state envelope.
   *
   * @param _ctx Behavior execution context.
   * @param encrypted Encrypted state envelope.
   * @returns Decrypted state value or the original value when nullish.
   */
  async decryptState(
    _ctx: BehaviorContext<T>,
    encrypted: T
  ): Promise<T | undefined> {
    try {
      vaultDebug(`${this.key} decryptState called.`);

      if (encrypted === undefined || encrypted === null) {
        vaultDebug(
          `${this.key} decrypt State skipped - not a valid plain state. The incoming value "${encrypted}". "${encrypted}" returned.`
        );
        return encrypted;
      }

      await this.#ensureSecretInitialized();

      const envelope = encrypted as unknown as EncryptedEnvelopeShape;

      if (
        !envelope ||
        typeof envelope !== 'object' ||
        // eslint-disable-next-line
        (envelope as any).alg !== 'AES-256-GCM' ||
        // eslint-disable-next-line
        typeof (envelope as any).iv !== 'string' ||
        // eslint-disable-next-line
        typeof (envelope as any).data !== 'string' ||
        // eslint-disable-next-line
        (envelope as any).v !== VAULT_CRYPTO_VERSION
      ) {
        const message = `${this.key} invalid encrypted envelope. Expected shape { v, alg: "AES-256-GCM", iv, data }.`;
        vaultDebug(message);
        throw new Error(message);
      }

      if (envelope.data.length > MAX_RECOMMENDED_B64) {
        vaultWarn(
          `${this.key} encrypted payload is very large (${envelope.data.length} chars). This may impact memory usage. Consider external storage
.`
        );
      }

      const iv = this.#base64ToAb(envelope.iv);
      const ciphertext = this.#base64ToAb(envelope.data);

      const additionalData = new TextEncoder().encode(VAULT_AAD_VERSION);

      const decryptedBuffer = await cryptoPlatform
        .getWebCrypto()
        .subtle.decrypt(
          { name: 'AES-GCM', iv: new Uint8Array(iv), additionalData },
          this.#cryptoKey,
          ciphertext
        );

      const decoded = new TextDecoder().decode(decryptedBuffer);
      return JSON.parse(decoded) as T;
    } catch (err) {
      if (err instanceof DOMException && err.name === 'OperationError') {
        throw new VaultEncryptionIntegrityError();
      }

      vaultDebug(`${this.key} AES decrypt failed: ${safeStringify(err)}.`);
      throw err;
    }
  }

  /**
   * Releases cached cryptographic material held by this behavior instance.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
    // eslint-disable-next-line
    this.#cryptoKey = undefined as any;
    this.#initPromise = undefined;
  }

  /**
   * Resets the encryption behavior to an uninitialized state.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset called; AES key material cleared`);
  }

  /**
   * Ensures the encryption key has been derived and cached.
   *
   * @returns Promise that resolves when initialization is complete.
   */
  async #ensureSecretInitialized(): Promise<void> {
    vaultDebug(`${this.key} ensureSecretInitialized called.`);
    if (this.#cryptoKey) {
      vaultDebug(`${this.key} cryptoKey is already set". Noop`);
      return;
    }

    if (!this.#initPromise) {
      this.#initPromise = this.#initializeKey();
    }

    await this.#initPromise;

    /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
    if (!this.#cryptoKey) {
      throw new Error('[vault] AES-256 key initialization failed');
    }
  }

  /**
   * Initializes the derived AES-256 encryption key.
   *
   * @returns Promise that resolves once the key is imported.
   */
  async #initializeKey(): Promise<void> {
    vaultDebug(`${this.key} initializing AES-256 secret`);
    this.#cryptoKey = await this.#importKey();
    vaultDebug(`[vault] AES-256 secret initialized`);
  }

  /**
   * Converts an ArrayBuffer into a base64-encoded string.
   *
   * @param buf Binary buffer to encode.
   * @returns Base64-encoded representation.
   */
  #abToBase64(buf: ArrayBuffer | ArrayBufferView): string {
    const bytes =
      buf instanceof ArrayBuffer
        ? new Uint8Array(buf)
        : new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);

    if (typeof btoa === 'function') {
      let s = '';
      const chunk = 0x8000;
      for (let i = 0; i < bytes.length; i += chunk) {
        s += String.fromCharCode(...bytes.subarray(i, i + chunk));
      }
      return btoa(s);
    }

    // eslint-disable-next-line
    const vaultBuffer = (globalThis as any).Buffer;
    if (vaultBuffer) {
      return vaultBuffer.from(bytes).toString('base64');
    }

    throw new Error(
      '[vault] Base64 encoding not supported in this environment'
    );
  }

  /**
   * Converts a base64-encoded string into an ArrayBuffer.
   *
   * @param b64 Base64-encoded input.
   * @returns Decoded binary buffer.
   */
  #base64ToAb(b64: string): ArrayBuffer {
    if (typeof atob === 'function') {
      const bin = atob(b64);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return bytes.buffer;
    }
    // eslint-disable-next-line
    const vaultBuffer = (globalThis as any).Buffer;
    if (vaultBuffer) {
      return Uint8Array.from(vaultBuffer.from(b64, 'base64')).buffer;
    }

    throw new Error(
      '[vault] Base64 decoding not supported in this environment'
    );
  }

  /**
   * Derives and imports an AES-256-GCM CryptoKey from the configured secret.
   *
   * @returns Derived CryptoKey instance.
   */
  async #importKey(): Promise<CryptoKey> {
    const secret = this.#options.aes256Secret;
    const iterations = this.#options.iterations;
    const salt = new Uint8Array(this.#options.salt).buffer;

    if (!cryptoPlatform.getWebCrypto()?.subtle)
      throw new Error('[vault] WebCrypto not available');

    const enc = new TextEncoder();

    const baseKey = await cryptoPlatform
      .getWebCrypto()
      .subtle.importKey('raw', enc.encode(secret), 'PBKDF2', false, [
        'deriveKey'
      ]);

    return cryptoPlatform.getWebCrypto().subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations,
        hash: 'SHA-256'
      },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }
}
