import { BehaviorSelectionModeTypes } from 'apps/docs-app/app/builder/types/behavior-selection-mode.type';
import { FileBuilderModeTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-mode.type';
import { BehaviorIdTypes } from 'apps/docs-app/app/builder/types/id/behavior-id.type';
import { PipelineCoreStateBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/state/with-core-state.pipeline.component';
import { StageDefinitionShape } from '../../../shapes/stage-definition.shape';
import { StageIdTypes } from '../../../types/id/stage-id.type';
import { SelectionModeTypes } from '../../../types/selection-mode.type';

export const PipelineBuilderUpdateStrategyStage: StageDefinitionShape = {
  id: StageIdTypes.UpdateStrategy,

  mode: FileBuilderModeTypes.Basic,

  // Left navigation
  label: 'Update Strategy',
  shortDescription:
    'Define how new state values are applied to the current state.',

  // Right explanation
  description:
    'After values are resolved and optionally filtered, the Reduce stage produces the next state value. This stage determines how that value updates the current state — whether it replaces the existing state entirely or merges into it.',

  question: 'How should the next state value update the current state?',

  note: 'Choosing Replace will overwrite the current state. Choosing Merge will preserve existing properties unless explicitly updated.',

  /**
   * Behaviors for update strategy
   */
  behaviors: [
    BehaviorIdTypes.WithReplaceStateBehavior,
    BehaviorIdTypes.WithMergeStateBehavior
  ],

  /**
   * Only one update strategy should be selected.
   */
  selectionMode: SelectionModeTypes.Single,

  behaviorSelectionMode: BehaviorSelectionModeTypes.Single,

  documentationComponentReference: PipelineCoreStateBehaviorComponent
};
