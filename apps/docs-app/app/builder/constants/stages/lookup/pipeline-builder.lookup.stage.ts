import { BehaviorSelectionModeTypes } from 'apps/docs-app/app/builder/types/behavior-selection-mode.type';
import { PipelineLookupBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/entity-access/lookup/lookup.behavior.component';
import { StageDefinitionShape } from '../../../shapes/stage-definition.shape';
import { BehaviorIdTypes } from '../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../types/id/stage-id.type';
import { SelectionModeTypes } from '../../../types/selection-mode.type';
import { StageLabelType } from '../../../types/stage-label.type';

export const PipelineBuilderLookupStage: StageDefinitionShape = {
  id: StageIdTypes.Lookup,

  label: StageLabelType.Lookup,

  description:
    'Lookup behaviors extend a FeatureCell with deterministic identifier-based entity resolution. ' +
    'Lookup requests are coordinated through the state pipeline and populated exclusively from finalized state emissions.',

  question:
    'Do you want to enable identifier-based entity lookup coordinated through the state pipeline?',

  note: 'Lookup operates as an extension behavior. It does not introduce time-based expiration, does not refresh automatically, and does not bypass pipeline execution. When not configured, no lookup surface is exposed.',

  /**
   * Built-in lookup behavior
   */
  behaviors: [BehaviorIdTypes.WithLookupBehavior],

  /**
   * Only one lookup behavior allowed
   */
  selectionMode: SelectionModeTypes.Single,

  /**
   * Only one lookup strategy per FeatureCell
   */
  behaviorSelectionMode: BehaviorSelectionModeTypes.Single,

  /**
   * Documentation renderer
   */
  documentationComponentReference: PipelineLookupBehaviorComponent
};
