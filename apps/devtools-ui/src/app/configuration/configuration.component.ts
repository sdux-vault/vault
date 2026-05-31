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
}
