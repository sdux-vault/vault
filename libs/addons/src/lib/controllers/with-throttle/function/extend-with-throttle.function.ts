import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { WithThrottleControllerOptions } from '../options/with-throttle-controller.options';

/**
 * Installs the withThrottle fluent API stub on a FeatureCell.
 *
 * @param cell - The FeatureCell base shape to extend.
 */
export function extendWithThrottleFluent<T>(
  cell: FeatureCellBaseShape<T>
): void {
  cell.withThrottle = function (_options: WithThrottleControllerOptions) {
    // buildtime behavior will replace this implementation
    throw new Error('[vault] withThrottle() controller not installed');
  };
}
