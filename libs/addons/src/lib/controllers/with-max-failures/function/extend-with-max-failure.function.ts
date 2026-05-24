import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { WithMaxFailureControllerOptions } from '../options/with-max-failure-controller.options';

/**
 * Installs the withMaxFailures fluent API stub on a FeatureCell.
 *
 * @param cell - The FeatureCell base shape to extend.
 */
export function extendWithMaxFailureFluent<T>(
  cell: FeatureCellBaseShape<T>
): void {
  cell.withMaxFailures = function (_options: WithMaxFailureControllerOptions) {
    // buildtime behavior will replace this implementation
    throw new Error('[vault] withMaxFailures() controller not installed');
  };
}
