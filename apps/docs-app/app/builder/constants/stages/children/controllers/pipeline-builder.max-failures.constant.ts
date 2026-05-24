import { FileBuilderCallStyleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-call-style.type';
import { BehaviorDefinitionShape } from '../../../../shapes/behavior-definition.shape';
import { FileBuilderApiTypes } from '../../../../types/file-builder/file-builder-api.type';
import { FileBuilderEmitTypes } from '../../../../types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from '../../../../types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from '../../../../types/file-builder/file-builder-target.type';
import { BehaviorIdTypes } from '../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../types/id/stage-id.type';

// TODO: Replace with actual docs component when created
// import { PipelineMaxFailuresControllerComponent } from '...';

export const PipelineBuilderMaxFailuresConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithMaxFailureController,

  /** Policy stage */
  parentId: StageIdTypes.Policy,

  /** UI copy */
  label: 'Max Failures Controller',
  question:
    'Should pipeline execution abort after a defined number of failures per trace?',

  description:
    'Tracks consecutive Failure messages per traceId and aborts execution once the configured maxFailures threshold is reached.',

  /** Configuration parameters */
  params: [
    {
      key: 'maxFailures',
      label: 'Maximum Failures per Trace',
      type: 'number',
      defaultValue: 3,
      validation: {
        required: true,
        min: 1
      }
    }
  ],

  /** Documentation renderer (add when created) */
  documentationComponentReference: undefined,

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
      symbol: 'withMaxFailuresController',
      role: FileBuilderRoleTypes.Structural,
      import: '@sdux-vault/addons',
      order: 0
    },

    /**
     * Runtime fluent configuration
     * Appears in this.#vault.withMaxFailures(...)
     */
    {
      target: FileBuilderTargetTypes.Vault,
      api: FileBuilderApiTypes.WithMaxFailuresController,
      emit: FileBuilderEmitTypes.Call,
      symbol: 'withMaxFailures',
      role: FileBuilderRoleTypes.Functional,
      callStyle: FileBuilderCallStyleTypes.Fluent,
      order: 0
    }
  ]
};
