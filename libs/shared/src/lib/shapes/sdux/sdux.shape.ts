import { EventBusContract } from '../../interfaces/event/event-bus.interface';
import { VaultMonitorContract } from '../../interfaces/vault/vault-monitor.interface';
import { VaultRegistrationShape } from '../../shapes/vault/vault-registration.shape';

/**
 * Shape of the global SDuX runtime namespace attached to the window object.
 */
export interface SDuXShape {
  /**
   * Global Vault monitor instance.
   */
  vaultMonitorInstance?: VaultMonitorContract;

  /**
   * Global Vault event bus instance.
   */
  vaultEventBus?: EventBusContract;

  /**
   * Registered package versions keyed by npm package name.
   */
  versions?: Record<string, string>;

  /**
   * Returns a read-only snapshot of the FeatureCell registry.
   */
  getRegistry?: () => ReadonlyMap<string, VaultRegistrationShape>;

  /**
   * Optional debug widget configuration for devtools integration.
   */
  debugWidget?: {
    injected?: boolean;
    aiAssistEnabled?: boolean;
  };
}
