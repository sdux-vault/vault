import { BehaviorClassContext } from '../../../contexts/behavior-class.context';
import { FeatureCellBaseShape } from '../../../shapes/feature-cell/feature-cell.base.shape';
import { BehaviorType } from '../../../types/behavior/behavior.type';
import { BehaviorContract } from './behavior.interface';

/**
 * Static-side contract for behavior classes used by the behavior factory.
 */
// eslint-disable-next-line
export interface BehaviorClassContract<T = any> {
  /**
   * Creates a new behavior instance.
   *
   * @param behaviorKey - Unique key assigned by the behavior factory.
   * @param behaviorCtx - Class-level context for dependency resolution.
   */
  new (
    behaviorKey: string,
    behaviorCtx: BehaviorClassContext
  ): BehaviorContract<T>;

  /** Pipeline stage in which this behavior participates. */
  readonly type: BehaviorType;

  /** Unique identifier assigned to this behavior class. */
  readonly key: string;

  /** Whether errors from this behavior halt the pipeline. */
  readonly critical: boolean;

  /**
   * Optional hook that installs a fluent API onto the FeatureCell.
   *
   * @param cell - The FeatureCell shape to extend.
   * @param behaviorConfigs - Map of behavior configuration entries.
   */
  installFluentApi?: <T>(
    cell: FeatureCellBaseShape<T>,
    behaviorConfigs: Map<string, unknown>
  ) => void;

  /** Whether this behavior requires consumer-supplied configuration. */
  readonly wantsConfig?: boolean;

  /** Configuration key used to locate behavior options in the config registry. */
  readonly configKey?: string;
}
