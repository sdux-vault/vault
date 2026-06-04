import { computed, inject, Injectable } from '@angular/core';
import { DEVTOOLS_AGGREGATE_KEY_CONSTANT } from '../../../../../../libs/shared/src/lib/constants';
import { DEVTOOLS_LOGGING_KEY_CONSTANT } from '../../../../../../libs/shared/src/lib/constants/dev-tools/devtools-logging-key.constant';
import { VaultRegistrationSerializedShape } from '../../shapes/vault-registration-serialized.shape';
import { InsightService } from '../insight/insight.service';

/**
 * Centralized registry service providing reactive access to FeatureCell
 * registration data, package versions, and license information.
 *
 * On construction the service reads the local `globalThis.sdux` namespace
 * via {@link InsightService.refreshLocalConfig} to populate an initial
 * snapshot. Subsequent updates arrive reactively through the
 * {@link InsightService.vaultConfig} signal.
 *
 * Filters out the internal devtools logging cell from the registry.
 */
@Injectable({ providedIn: 'root' })
export class DevtoolsRegistryService {
  /** Insight service providing the raw Vault configuration signal. */
  #insight = inject(InsightService);

  /**
   * Triggers an immediate local config read so that registry,
   * versions, and license data are available at startup.
   */
  constructor() {
    this.#insight.refreshLocalConfig();
  }

  /**
   * Serialized FeatureCell registry snapshot from the Vault configuration signal.
   *
   * Filters out the internal devtools logging cell.
   */
  readonly registry = computed(() => {
    const config = this.#insight.vaultConfig();
    return (config?.registry ?? []).filter(
      (cell) =>
        ![
          DEVTOOLS_LOGGING_KEY_CONSTANT,
          DEVTOOLS_AGGREGATE_KEY_CONSTANT
        ].includes(cell.key)
    );
  });

  /**
   * Sorted package-version entries derived from the Vault configuration signal.
   *
   * @returns An array of `[packageName, version]` tuples sorted alphabetically,
   *          or an empty array when no version data is available.
   */
  readonly versions = computed(() => {
    const config = this.#insight.vaultConfig();
    if (!config?.versions) return [];
    return Object.entries(config.versions).sort(([a], [b]) =>
      a.localeCompare(b)
    );
  });

  /** Verified license payload from the Vault configuration signal. */
  readonly license = computed(() => {
    const config = this.#insight.vaultConfig();
    return config?.license ?? null;
  });

  /**
   * Retrieves the registry entry for a given FeatureCell key.
   *
   * @param cellKey - The unique FeatureCell key to look up.
   * @returns The matching registry entry, or `null` if not found.
   */
  getCell(cellKey: string): VaultRegistrationSerializedShape | null {
    return this.registry().find((c) => c.key === cellKey) ?? null;
  }
}
