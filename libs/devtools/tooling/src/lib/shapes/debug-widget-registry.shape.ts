import { DebugWidgetLicenseSummaryShape } from './debug-widget-license-summary.shape';
import { SerializedFeatureCellShape } from './serialized-feature-cell.shape';

/** Shape representing the serialized FeatureCell registry in a debug dump. */
export interface DebugWidgetRegistryShape {
  /** Total number of registered FeatureCells. */
  totalFeatureCells: number;
  /** Array of serialized FeatureCell entries. */
  featureCells: SerializedFeatureCellShape[];
  /** Optional summary of license states across all cells. */
  licenseSummary?: DebugWidgetLicenseSummaryShape;
}
