import { PIPELINE_BUILDER_TRANSFORM_ERROR_AI_ASSIST_CONSTANT } from 'apps/docs-app/app/builder/constants/ai-assist/transform-error.ai-assist.constant';
import { FileBuilderApiTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-api.type';
import { FileBuilderEmitTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-target.type';
import { ParameterTypes } from 'apps/docs-app/app/builder/types/parameter.type';
import { PipelineErrorTransformBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/errors/with-error-transform/with-error-transform.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderErrorTransformConstant: BehaviorDefinitionShape = {
  /**
   * Stable identifier
   */
  id: BehaviorIdTypes.WithCoreTransformErrorBehavior,

  /**
   * Owning stage
   */
  parentId: StageIdTypes.Error,

  /**
   * UI label
   */
  label: 'Error Transform Behavior',

  /**
   * Selection prompt
   */
  question:
    'Do you need to transform, enrich, or replace the VaultErrorShape before it is committed to state?',

  /**
   * Summary
   */
  description:
    'Authoritative add-on behavior that may transform or replace the current VaultErrorShape before final state commitment.',

  /**
   * Engineer-supplied transform function
   */
  params: [
    {
      key: 'transform',
      label: 'Error Transform Function',
      type: ParameterTypes.Function,
      defaultValue: `(error, current, state) => VAULT_NOOP`,
      optional: false,
      hint: `Receives:
- error: unknown (raw thrown value)
- current: VaultErrorShape (normalized error)
- state: StateSnapshotShape<T> (immutable snapshot)

Must return:
- A new VaultErrorShape to replace the current error
- VAULT_NOOP to preserve the existing error

Must not throw.
Must not mutate current or state.`,
      placeholder: '(error, current, state) => VAULT_NOOP'
    }
  ],

  /**
   * Documentation renderer
   */
  documentationComponentReference: PipelineErrorTransformBehaviorComponent,

  /**
   * AI assist constant
   */
  aiAssist: PIPELINE_BUILDER_TRANSFORM_ERROR_AI_ASSIST_CONSTANT,

  /**
   * ─────────────────────────────
   * Code emission metadata
   * ─────────────────────────────
   */
  code: [
    {
      /**
       * Registered declaratively in FeatureCell definition
       */
      target: FileBuilderTargetTypes.FeatureCell,

      /**
       * Behavior registration
       */
      api: FileBuilderApiTypes.Behaviors,

      /**
       * Emit as class reference
       */
      emit: FileBuilderEmitTypes.Reference,

      /**
       * Behavior class symbol
       */
      symbol: 'withErrorTransformBehavior',

      /**
       * Add-on role
       */
      role: FileBuilderRoleTypes.Functional,

      /**
       * Declarative registration
       */

      /**
       * Executes after core normalization
       */
      order: 1
    }
  ]
};
