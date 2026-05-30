import { FileBuilderCallStyleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-call-style.type';
import { PipelineWithThrottleControllerComponent } from '../../../../../docs/pipeline/controllers/components/with-throttle/with-throttle.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../shapes/behavior-definition.shape';
import { FileBuilderApiTypes } from '../../../../types/file-builder/file-builder-api.type';
import { FileBuilderEmitTypes } from '../../../../types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from '../../../../types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from '../../../../types/file-builder/file-builder-target.type';
import { BehaviorIdTypes } from '../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../types/id/stage-id.type';

export const PipelineBuilderThrottleConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithThrottleController,

  /** Owning stage */
  parentId: StageIdTypes.Policy,

  /** UI copy */
  label: 'Throttle Controller',
  question:
    'Should pipeline execution be limited to at most one update within a fixed time window?',

  description:
    'Enforces a fixed execution window that limits how frequently pipeline execution may proceed. ' +
    'Updates occurring within the active throttle window are aborted and do not resume later.',

  /** Optional configuration parameters */
  params: [
    {
      key: 'millisecondThrottle',
      label: 'Throttle window duration (ms)',
      type: 'number',
      defaultValue: 500,
      validation: {
        required: true,
        min: 0
      }
    }
  ],

  /** Render full documentation inline when requested */
  documentationComponentReference: PipelineWithThrottleControllerComponent,

  /**
   * ─────────────────────────────
   * Code emission metadata
   * ─────────────────────────────
   */
  code: [
    {
      /** Policy controller attaches to Vault initialization */
      target: FileBuilderTargetTypes.FeatureCell,

      /** Fluent API group */
      api: FileBuilderApiTypes.Controllers,

      /** Function call emission with params */
      emit: FileBuilderEmitTypes.Reference,

      /** Exported function symbol */
      symbol: 'withThrottleController',

      /** Structural execution controller */
      role: FileBuilderRoleTypes.Structural,

      import: `@sdux-vault/addons`,

      /** Order after delay, before replay (if applicable) */
      order: 40
    },
    /**
     * Runtime fluent configuration
     * Appears in this.#vault.withThrottle?.(...)
     */
    {
      target: FileBuilderTargetTypes.Vault,
      api: FileBuilderApiTypes.WithThrottleController,
      emit: FileBuilderEmitTypes.Call,
      symbol: 'withThrottle',
      role: FileBuilderRoleTypes.Functional,
      callStyle: FileBuilderCallStyleTypes.Fluent,
      order: 0
    }
  ]
};
