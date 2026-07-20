import type { BehaviorContext } from '../contexts/behavior.context';
import type { ControllerContext } from '../contexts/controller.context';
import type { FeatureCellExtensionContext } from '../contexts/feature-cell-extension.context';

/** Union of context types accepted by VaultMonitor lifecycle methods. */
export type VaultMonitorContext<T> =
  BehaviorContext<T> | ControllerContext<T> | FeatureCellExtensionContext<T>;
