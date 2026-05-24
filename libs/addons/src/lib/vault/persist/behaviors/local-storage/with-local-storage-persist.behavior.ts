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
 * LocalStorage persistence behavior that writes and restores FeatureCell state
 * using the browser localStorage API.
 *
 * State persists across browser sessions until explicitly cleared or removed.
 * This behavior runs during the persist stage of the Vault pipeline.
 */
@VaultBehavior({
  type: BehaviorTypes.Persist,
  key: defineBehaviorKey('Persist', 'LocalStorage'),
  critical: false,
  needsLicense: true,
  licenseId: VAULT_LICENSE_ID
})
export class withLocalStoragePersistBehavior<T>
  extends LicensingAbstract<T>
  implements PersistBehaviorContract<T>
{
  /** Static metadata describing the behavior classification. */
  static readonly type: BehaviorType;

  /**
   * License identifier required by this behavior.
   */
  static readonly licenseId: string;

  /** Indicates this persist behavior is critical. */
  static readonly critical: boolean;

  /** Instance-level behavior type. */
  readonly type = BehaviorTypes.Persist;

  /** Unique per-instance behavior key. */
  readonly key: string;

  /** Indicates whether this behavior instance is critical to pipeline execution. */
  readonly critical = true;

  /**
   * Fully namespaced localStorage key for this FeatureCell.
   */
  readonly #storageKey: string;

  /**
   * Creates a LocalStorage persistence behavior instance.
   *
   * @param key - Unique identifier for this behavior instance.
   * @param behaviorCtx - DI context, supplied by the FeatureCell builder.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    super(behaviorCtx);
    this.key = key;
    this.#storageKey = definePersistKey(
      'localStorage',
      behaviorCtx.featureCellKey,
      this.key
    );
    vaultDebug(`${this.key} storagekey is "${this.#storageKey}".`);
    verifyLicensePayload(this.behaviorCtx.licensePayload as string).then(
      (valid: boolean) => this.validateLicense(valid)
    );
  }

  /**
   * Persists state into the browser localStorage, or removes the entry when undefined.
   *
   * @param current - The state value to persist.
   */
  persistState(current: PipelinePersistValue<T>): void {
    vaultDebug(
      `${this.key} persistState called with "${safeStringify(current)}".`
    );
    try {
      // Remove entry if state is undefined
      if (current === undefined) {
        localStorage.removeItem(this.#storageKey);
        vaultDebug(`${this.key} localStorage removed. Current is "undefined".`);
        return;
      }

      const serialized = JSON.stringify(current);
      localStorage.setItem(this.#storageKey, serialized);
      vaultDebug(
        `${this.key} localStorage set with "${safeStringify(current)}".`
      );
    } catch (err) {
      vaultDebug(
        `[vault] LocalStorage persistence failed for key "${this.#storageKey}": ${safeStringify(err)}`
      );
    }
  }

  /**
   * Clears the stored state by removing the associated localStorage entry.
   */
  clearState(): void {
    try {
      localStorage.removeItem(this.#storageKey);
      vaultDebug(`${this.key} localStorage removed. clearState called.`);
    } catch (err) {
      vaultDebug(
        `[vault] LocalStorage removeState() failed for key "${this.#storageKey}": ${safeStringify(err)}`
      );
    }
  }

  /**
   * Loads state from localStorage, returning undefined when missing or invalid.
   *
   * @returns The loaded and parsed state, or undefined if missing or invalid.
   */
  loadState(): PipelinePersistValue<T> {
    try {
      const raw = localStorage.getItem(this.#storageKey);
      vaultDebug(
        `${this.key} loadState called with key "${this.#storageKey}".`
      );

      if (raw === null) {
        vaultDebug(`${this.key} loadState returned with "undefined".`);
        return undefined;
      }

      vaultDebug(`${this.key} loadState JSON.parsed and returned.`);
      return JSON.parse(raw) as T;
    } catch (err) {
      vaultDebug(
        `[vault] LocalStorage load failed for key "${this.#storageKey}": ${safeStringify(err)}`
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
   * Resets the persisted localStorage entry for this FeatureCell.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset called`);
    this.clearState();
  }
}
