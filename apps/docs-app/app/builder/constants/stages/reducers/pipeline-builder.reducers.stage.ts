import { BehaviorSelectionModeTypes } from 'apps/docs-app/app/builder/types/behavior-selection-mode.type';
import { FileBuilderModeTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-mode.type';
import { PipelineReducersBehaviorComponent } from '../../../../docs/pipeline/behaviors/components/reducers/reducers.pipeline.component';
import { StageDefinitionShape } from '../../../shapes/stage-definition.shape';
import { BehaviorIdTypes } from '../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../types/id/stage-id.type';
import { SelectionModeTypes } from '../../../types/selection-mode.type';

export const PipelineBuilderReducerStage: StageDefinitionShape = {
  id: StageIdTypes.Reducer,

  mode: FileBuilderModeTypes.Basic,

  disabled: false,

  // Used on the left-hand navigation
  label: 'Reduce State',
  shortDescription:
    'Derive and commit the next immutable state snapshot from the current state.',

  // Used for right-hand explanation
  description:
    'The Reducer stage deterministically derives the next immutable state snapshot from the current state. Reducers execute in order, must remain pure, and are the only stage permitted to produce structural state transitions.',

  question:
    'How should the next immutable state snapshot be derived from the current state?',

  note: 'Core behaviors are intrinsic to the pipeline and will not appear as explicit registrations in the generated file. Engineers attach reducer logic using the fluent .reducers() API during vault initialization.',

  /**
   * Powered by a core reducer behavior.
   */
  behaviors: [BehaviorIdTypes.WithCoreReducerBehavior],

  /**
   * Stage is selectable.
   */
  selectionMode: SelectionModeTypes.Single,

  /**
   * Multiple reducer functions allowed.
   */
  behaviorSelectionMode: BehaviorSelectionModeTypes.Multiple,

  /**
   * Documentation renderer
   */
  documentationComponentReference: PipelineReducersBehaviorComponent
};
