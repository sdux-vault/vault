import {
  BehaviorClassContext,
  BehaviorType,
  BehaviorTypes,
  defineBehaviorKey,
  PersistBehaviorContract,
  PipelinePersistValue,
  safeStringify,
  VaultBehavior,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';

import { definePersistKey } from '../../utils/define-persist-key.util';

import {
  LicensingAbstract,
  VAULT_LICENSE_ID,
  verifyLicensePayload
} from '@sdux-vault/engine';

/**
 * Cookie-based persistence behavior that writes and restores FeatureCell state
 * using the browser document.cookie API.
 *
 * Cookies are limited to approximately 4096 bytes, so a hard safety threshold
 * of 4000 bytes is enforced. This behavior runs during the persist stage of
 * the Vault pipeline.
 */
@VaultBehavior({
  type: BehaviorTypes.Persist,
  key: defineBehaviorKey('Persist', 'CookieStorage'),
  critical: false,
  needsLicense: true,
  licenseId: VAULT_LICENSE_ID
})
export class withCookieStoragePersistBehavior<T>
  extends LicensingAbstract<T>
  implements PersistBehaviorContract<T>
{
  /** Static metadata describing this behavior's type. */
  static readonly type: BehaviorType;

  /** Indicates that this persist behavior is not critical. */
  static readonly critical: boolean;

  /** Instance-level behavior type. */
  readonly type = BehaviorTypes.Persist;

  /** Unique behavior instance key. */
  readonly key: string;

  /** Indicates whether this behavior instance is critical to pipeline execution. */
  readonly critical = true;

  /**
   * Fully namespaced cookie key for this FeatureCell.
   */
  readonly #cookieKey: string;

  /**
   * License identifier required by this behavior.
   */
  static readonly licenseId: string;

  /**
   * Creates a cookie persistence behavior instance.
   *
   * @param key - The unique identifier for this behavior instance.
   * @param behaviorCtx - Behavior context supplying configuration and hooks.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    super(behaviorCtx);
    this.key = key;
    this.#cookieKey = definePersistKey(
      'cookieStorage',
      behaviorCtx.featureCellKey,
      this.key
    );
    vaultDebug(`${this.key} storagekey is "${this.#cookieKey}".`);

    verifyLicensePayload(this.behaviorCtx.licensePayload as string).then(
      (valid: boolean) => this.validateLicense(valid)
    );
  }

  /**
   * Persists state into a cookie, or removes the cookie when undefined.
   *
   * @param current - The state value to persist.
   */
  persistState(current: PipelinePersistValue<T>): void {
    vaultDebug(
      `${this.key} persistState called with "${safeStringify(current)}".`
    );

    try {
      // Remove cookie if state is undefined
      if (current === undefined) {
        document.cookie = `${this.#cookieKey}=; Max-Age=0; path=/`;
        vaultDebug(`${this.key} cookie removed. Current is "undefined".`);
        return;
      }

      const serialized = encodeURIComponent(JSON.stringify(current));

      // Enforce safe cookie size
      if (serialized.length > 4000) {
        vaultWarn(
          `[vault] CookiePersist rejected write for key "${this.#cookieKey}" — payload size ${serialized.length} exceeds safe cookie limit (~4096 bytes). Vault hard-cap limit is 4000 bytes.`
        );
        return;
      }

      // Default expiration: Session cookie
      document.cookie = `${this.#cookieKey}=${serialized}; path=/`;

      vaultDebug(`${this.key} cookie set with "${safeStringify(current)}".`);
    } catch (err) {
      vaultDebug(
        `[vault] Cookie persistence failed for key "${this.#cookieKey}": ${safeStringify(err)}`
      );
    }
  }

  /**
   * Clears the cookie associated with this FeatureCell.
   */
  clearState(): void {
    try {
      document.cookie = `${this.#cookieKey}=; Max-Age=0; path=/`;
      vaultDebug(`${this.key} cookie removed. clearState called.`);
    } catch (err) {
      vaultDebug(
        `[vault] Cookie removeState() failed for key "${this.#cookieKey}": ${safeStringify(err)}`
      );
    }
  }

  /**
   * Loads state from the cookie, returning undefined when missing or invalid.
   *
   * @returns The deserialized state if available, otherwise undefined.
   */
  loadState(): PipelinePersistValue<T> {
    try {
      vaultDebug(`${this.key} loadState called with key "${this.#cookieKey}".`);

      const cookies = document.cookie.split('; ');
      const entry = cookies.find((c) => c.startsWith(`${this.#cookieKey}=`));

      if (!entry) {
        vaultDebug(`${this.key} loadState returned with "undefined".`);
        return undefined;
      }

      const raw = decodeURIComponent(entry.substring(entry.indexOf('=') + 1));

      vaultDebug(`${this.key} loadState JSON.parsed and returned.`);
      return JSON.parse(raw) as T;
    } catch (err) {
      vaultDebug(
        `[vault] Cookie load failed for key "${this.#cookieKey}": ${safeStringify(err)}`
      );
      return undefined;
    }
  }

  /**
   * Teardown hook invoked when the FeatureCell is destroyed.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Resets the persisted cookie entry for this FeatureCell.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset called (cookie cleared)`);
    this.clearState();
  }
}
