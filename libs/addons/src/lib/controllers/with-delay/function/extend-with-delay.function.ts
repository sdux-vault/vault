import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { WithDelayControllerOptions } from '../options/with-delay-controller.options';

/**
 * Installs the withDelay fluent API stub on a FeatureCell.
 *
 * @param cell - The FeatureCell base shape to extend.
 */
export function extendWithDelayFluent<T>(cell: FeatureCellBaseShape<T>): void {
  cell.withDelay = function (_options: WithDelayControllerOptions) {
    throw new Error('[vault] withDelay() controller not installed');
  };
}
