import { ControllerClassContext } from '../../contexts/controller-class.context';
import { FeatureCellBaseShape } from '../../shapes/feature-cell/feature-cell.base.shape';
import { ControllerType } from '../../types/controller/controller.type';
import { ControllerContract } from './controller.interface';

/** Static-side contract for controller classes used by the controller factory. */
// eslint-disable-next-line
export interface ControllerClassContract<T = any> {
  /**
   * Creates a new controller instance.
   *
   * @param controllerKey - Unique key assigned by the controller factory.
   * @param controllerCtx - Class-level context for dependency resolution.
   */
  new (
    controllerKey: string,
    controllerCtx: ControllerClassContext
  ): ControllerContract<T>;

  /** Pipeline stage in which this controller participates. */
  readonly type: ControllerType;

  /** Unique identifier assigned to this controller class. */
  readonly key: string;

  /** Whether errors from this controller halt the pipeline. */
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
}
