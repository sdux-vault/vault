import { BehaviorSelectionModeTypes } from 'apps/docs-app/app/builder/types/behavior-selection-mode.type';
import { StageStatusTypes } from 'apps/docs-app/app/builder/types/stage-status.type';
import { PipelineMergeBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/merge/merge.pipeline.component';
import { StageDefinitionShape } from '../../../shapes/stage-definition.shape';
import { BehaviorIdTypes } from '../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../types/id/stage-id.type';
import { SelectionModeTypes } from '../../../types/selection-mode.type';
import { StageLabelType } from '../../../types/stage-label.type';

export const PipelineBuilderMergeStage: StageDefinitionShape = {
  id: StageIdTypes.Merge,

  selected: true,
  disabled: true,
  status: StageStatusTypes.Complete,

  label: StageLabelType.Merge,

  description:
    'Combines the current committed FeatureCell state with a newly resolved pipeline value before downstream processing continues.',

  /**
   * Informational — Merge is always active
   */
  question:
    'Merge is a core pipeline stage that defines how resolved values are structurally combined with existing state.',

  /**
   * Exactly one merge behavior may be active.
   * The default withArrayMergeBehavior is applied automatically
   * if no other merge strategy is selected.
   */
  behaviors: [
    BehaviorIdTypes.WithArrayMergeBehavior,
    BehaviorIdTypes.WithArrayAppendMergeBehavior,
    BehaviorIdTypes.WithArrayPushMergeBehavior,
    BehaviorIdTypes.WithObjectShallowMergeBehavior,
    BehaviorIdTypes.WithObjectDeepMergeBehavior
  ],

  note: 'Exactly one Merge behavior must be active. If no merge behavior is explicitly selected, the default withArrayMergeBehavior is applied automatically. Merge behaviors define structural state combination semantics and must be declared at FeatureCell definition time.',

  selectionMode: SelectionModeTypes.Single,
  /**
   * Only one merge strategy allowed
   */
  behaviorSelectionMode: BehaviorSelectionModeTypes.Single,

  /**
   * Documentation renderer
   */
  documentationComponentReference: PipelineMergeBehaviorComponent
};
