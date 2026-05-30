import { FileBuilderCallStyleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-call-style.type';
import { PipelineDelayControllerComponent } from 'apps/docs-app/app/docs/pipeline/controllers/components/delay/delay.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../shapes/behavior-definition.shape';
import { FileBuilderApiTypes } from '../../../../types/file-builder/file-builder-api.type';
import { FileBuilderEmitTypes } from '../../../../types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from '../../../../types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from '../../../../types/file-builder/file-builder-target.type';
import { BehaviorIdTypes } from '../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../types/id/stage-id.type';

export const PipelineBuilderDelayConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithDelayController,

  /** Policy stage */
  parentId: StageIdTypes.Policy,

  /** UI copy */
  label: 'Delay Controller',
  question:
    'Should pipeline execution be paused for a fixed interval before continuing?',

  description:
    'Introduces a deterministic, fixed delay before each pipeline execution attempt proceeds. Each update is paused independently and resumes unchanged after the configured interval.',

  /** Configuration parameters (used by builder UI) */
  params: [
    {
      key: 'millisecondDelay',
      label: 'Delay duration (ms)',
      type: 'number',
      defaultValue: 500,
      validation: {
        required: true,
        min: 0
      }
    }
  ],

  /** Optional documentation renderer */
  documentationComponentReference: PipelineDelayControllerComponent,

  /**
   * ─────────────────────────────
   * Code emission metadata
   * ─────────────────────────────
   */
  code: [
    /**
     * Definition-time structural controller
     * Appears in provideFeatureCell(..., [], [controllers])
     */
    {
      target: FileBuilderTargetTypes.FeatureCell,
      api: FileBuilderApiTypes.Controllers,
      emit: FileBuilderEmitTypes.Reference,
      symbol: 'withDelayController',
      role: FileBuilderRoleTypes.Structural,
      import: '@sdux-vault/addons',
      order: 0
    },

    /**
     * Runtime fluent configuration
     * Appears in this.#vault.withDelay?.(...)
     */
    {
      target: FileBuilderTargetTypes.Vault,
      api: FileBuilderApiTypes.WithDelayController,
      emit: FileBuilderEmitTypes.Call,
      symbol: 'withDelay',
      role: FileBuilderRoleTypes.Functional,
      callStyle: FileBuilderCallStyleTypes.Fluent,
      order: 0
    }
  ]
};
