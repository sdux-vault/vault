import { BehaviorSelectionModeTypes } from 'apps/docs-app/app/builder/types/behavior-selection-mode.type';
import { FileBuilderModeTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-mode.type';
import { PipelineResolveComponent } from '../../../../docs/pipeline/behaviors/components/resolve/resolve.pipeline.component';
import { StageDefinitionShape } from '../../../shapes/stage-definition.shape';
import { BehaviorIdTypes } from '../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../types/id/stage-id.type';
import { SelectionModeTypes } from '../../../types/selection-mode.type';

export const PipelineBuilderResolveStage: StageDefinitionShape = {
  id: StageIdTypes.Resolve,

  mode: FileBuilderModeTypes.Basic,

  disabled: false,

  // Used on the left hand navigation
  label: 'Resolve Input',
  shortDescription:
    'Normalize incoming values before they enter the state pipeline.',

  // Used for Right hand explanation
  description:
    'The Resolve stage converts all external inputs into a canonical upstream value before any filtering or reduction occurs. This guarantees structural consistency and ensures downstream stages operate on a normalized input contract.',

  question:
    'How should incoming values be normalized before entering the state pipeline?',

  note: 'Core behaviors are intrinsic to the pipeline and will not appear as explicit registrations in the generated file. This is expected.',

  /**
   * Only behavior relevant to Resolve:
   * fromStream extension
   */
  behaviors: [
    BehaviorIdTypes.WithCoreValueBehavior,
    BehaviorIdTypes.WithCoreObservableBehavior,
    BehaviorIdTypes.WithCorePromiseBehavior,
    BehaviorIdTypes.WithCoreFromStreamBehavior,
    BehaviorIdTypes.WithHttpResourceBehavior
  ],

  /**
   * Core stages are not optional.
   * They should not behave like toggled stages.
   */
  selectionMode: SelectionModeTypes.Single,

  behaviorSelectionMode: BehaviorSelectionModeTypes.Single,

  /**
   * Documentation renderer
   */
  documentationComponentReference: PipelineResolveComponent
};
