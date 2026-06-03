import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { InsightService } from '../services/insight/insight.service';
import { VaultRegistrationSerializedShape } from '../shapes/vault-registration-serialized.shape';
import { RegistryDetailComponent } from './registry-detail/registry-detail.component';

/**
 * Configuration component displaying Vault runtime versions
 * and the FeatureCell registry within the DevTools UI.
 *
 * On construction the component reads the local `globalThis.sdux` namespace
 * via {@link InsightService.refreshLocalConfig} to populate an initial
 * snapshot. When running inside the Chrome extension the bridge may
 * subsequently merge additional data from the inspected page.
 *
 * Clicking a FeatureCell row opens a detail panel on the right displaying
 * registered behaviors and controllers for that cell.
 *
 * The component is standalone and uses OnPush change detection driven
 * by the {@link InsightService.vaultConfig} signal.
 */
@Component({
  selector: 'sdux-devtools-configuration',
  standalone: true,
  imports: [RegistryDetailComponent],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationComponent {
  /** InsightService providing the Vault configuration from the bridge. */
  private readonly insight = inject(InsightService);

  /**
   * Triggers an immediate local config read so that versions and
   * registry data are available by the time the template renders.
   */
  constructor() {
    this.insight.refreshLocalConfig();
  }

  /**
   * Sorted package-version entries derived from the Vault configuration signal.
   *
   * @returns An array of `[packageName, version]` tuples sorted alphabetically,
   *          or an empty array when no version data is available.
   */
  readonly versions = computed(() => {
    const config = this.insight.vaultConfig();
    if (!config?.versions) return [];
    return Object.entries(config.versions).sort(([a], [b]) =>
      a.localeCompare(b)
    );
  });

  /**
   * Serialized FeatureCell registry snapshot from the Vault configuration signal.
   *
   * @returns An array of serialized FeatureCell registration records,
   *          or an empty array when no registry data is available.
   */
  readonly registry = computed(() => {
    const config = this.insight.vaultConfig();
    return config?.registry ?? [];
  });

  /** Verified license payload from the Vault configuration signal. */
  readonly license = computed(() => {
    const config = this.insight.vaultConfig();
    return config?.license ?? null;
  });

  /**
   * Formats a license date value for display.
   *
   * @param value - A Unix-epoch millisecond timestamp or `'forever'`.
   * @returns A human-readable date string.
   */
  formatLicenseDate(value: number | 'forever'): string {
    if (value === 'forever') return 'Never';
    return new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }).format(new Date(value));
  }

  /** The currently selected FeatureCell for the detail panel. */
  readonly selectedCell = signal<VaultRegistrationSerializedShape | null>(null);

  /**
   * Selects a FeatureCell to display in the detail panel.
   *
   * @param cell - The serialized registry entry to select.
   */
  selectCell(cell: VaultRegistrationSerializedShape): void {
    this.selectedCell.set(cell);
  }

  /** Closes the detail panel by clearing the selection. */
  closeDetail(): void {
    this.selectedCell.set(null);
  }

  /** Returns the count of behaviors requiring a license in the given cell. */
  behaviorLicenseCount(cell: VaultRegistrationSerializedShape): number {
    return cell.behaviors.filter((b) => b.needsLicense).length;
  }

  /** Returns the count of controllers requiring a license in the given cell. */
  controllerLicenseCount(cell: VaultRegistrationSerializedShape): number {
    return cell.controllers.filter((c) => c.needsLicense).length;
  }
}
