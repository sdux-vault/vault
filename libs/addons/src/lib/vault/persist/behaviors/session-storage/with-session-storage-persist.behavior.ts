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
 * SessionStorage persistence behavior that writes and restores FeatureCell state
 * using the browser sessionStorage API.
 *
 * State persists only for the lifetime of the browser tab and is automatically
 * cleared when the tab closes. This behavior runs during the persist stage of
 * the Vault pipeline.
 */
@VaultBehavior({
  type: BehaviorTypes.Persist,
  key: defineBehaviorKey('Persist', 'SessionStorage'),
  critical: false,
  needsLicense: true,
  licenseId: VAULT_LICENSE_ID
})
export class withSessionStoragePersistBehavior<T>
  extends LicensingAbstract<T>
  implements PersistBehaviorContract<T>
{
  /** Static metadata describing the behavior’s category. */
  static readonly type: BehaviorType;

  /** Indicates this behavior is not critical to pipeline execution. */
  static readonly critical: boolean;

  /** Instance-level behavior type. */
  readonly type = BehaviorTypes.Persist;

  /** Unique behavior instance key. */
  readonly key: string;

  /** Indicates whether this behavior instance is critical to pipeline execution. */
  readonly critical = true;

  /**
   * License identifier required by this behavior.
   */
  static readonly licenseId: string;

  /**
   * Fully qualified sessionStorage key used to store this FeatureCell’s data.

   */
  readonly #storageKey: string;

  /**
   * Creates a new SessionStorage persistence behavior instance.
   *
   * @param key - Unique identifier for this behavior instance.
   * @param behaviorCtx - Behavior context supplying configuration and hooks.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    super(behaviorCtx);
    this.key = key;
    this.#storageKey = definePersistKey(
      'sessionStorage',
      behaviorCtx.featureCellKey,
      this.key
    );
    vaultDebug(`${this.key} storagekey is "${this.#storageKey}".`);

    verifyLicensePayload(this.behaviorCtx.licensePayload as string).then(
      (valid: boolean) => this.validateLicense(valid)
    );
  }

  /**
   * Persists state into the browser sessionStorage, or removes the entry when undefined.
   *
   * @param current - The value to be written to sessionStorage.
   */
  persistState(current: PipelinePersistValue<T>): void {
    vaultDebug(
      `${this.key} persistState called with "${safeStringify(current)}".`
    );

    try {
      // Remove entry if state is undefined
      if (current === undefined) {
        sessionStorage.removeItem(this.#storageKey);
        vaultDebug(
          `${this.key} sessionStorage removed. Current is "undefined".`
        );
        return;
      }

      const serialized = JSON.stringify(current);
      sessionStorage.setItem(this.#storageKey, serialized);

      vaultDebug(
        `${this.key} sessionStorage set with "${safeStringify(current)}".`
      );
    } catch (err) {
      vaultDebug(
        `[vault] SessionStorage persistence failed for key "${this.#storageKey}": ${safeStringify(err)}`
      );
    }
  }

  /**
   * Clears the stored state by removing the associated sessionStorage entry.
   */
  clearState(): void {
    try {
      sessionStorage.removeItem(this.#storageKey);
      vaultDebug(`${this.key} sessionStorage removed. clearState called.`);
    } catch (err) {
      vaultDebug(
        `[vault] SessionStorage removeState() failed for key "${this.#storageKey}": ${safeStringify(err)}`
      );
    }
  }

  /**
   * Loads state from sessionStorage, returning undefined when missing or invalid.
   *
   * @returns The loaded state, or undefined on missing or invalid data.
   */
  loadState(): PipelinePersistValue<T> {
    try {
      vaultDebug(
        `${this.key} loadState called with key "${this.#storageKey}".`
      );
      const raw = sessionStorage.getItem(this.#storageKey);

      if (raw === null) {
        vaultDebug(`${this.key} loadState returned with "undefined".`);
        return undefined;
      }

      vaultDebug(`${this.key} loadState JSON.parsed and returned.`);
      return JSON.parse(raw) as T;
    } catch (err) {
      vaultDebug(
        `[vault] SessionStorage load failed for key "${this.#storageKey}": ${safeStringify(err)}`
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
   * Resets the persisted sessionStorage entry for this FeatureCell.

   */
  reset(): void {
    vaultWarn(`${this.key} - reset called (sessionStorage cleared)`);
    this.clearState();
  }
}
