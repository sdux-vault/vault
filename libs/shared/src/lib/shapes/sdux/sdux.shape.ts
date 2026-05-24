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
   * Optional debug widget configuration for devtools integration.
   */
  debugWidget?: {
    versions?: Record<string, string>;
    injected?: boolean;
    aiAssistEnabled?: boolean;
    getRegistry?: () => ReadonlyMap<string, VaultRegistrationShape>;
  };
}
