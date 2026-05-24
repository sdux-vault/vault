import { BehaviorSelectionModeTypes } from 'apps/docs-app/app/builder/types/behavior-selection-mode.type';
import { BehaviorIdTypes } from 'apps/docs-app/app/builder/types/id/behavior-id.type';
import { PipelineEncryptBehaviorComponent } from '../../../../docs/pipeline/behaviors/components/encrypt/encrypt.pipeline.component';
import { StageDefinitionShape } from '../../../shapes/stage-definition.shape';
import { StageIdTypes } from '../../../types/id/stage-id.type';
import { SelectionModeTypes } from '../../../types/selection-mode.type';
import { StageLabelType } from '../../../types/stage-label.type';

export const PipelineBuilderEncryptStage: StageDefinitionShape = {
  id: StageIdTypes.Encrypt,

  label: StageLabelType.Encrypt,

  description:
    'Protect persisted FeatureCell state by encrypting finalized pipeline output before persistence and decrypting during rehydration. Encrypt behaviors operate strictly at the persistence boundary and never alter in-memory state.',

  question:
    'Do you need to protect persisted FeatureCell state using encryption at rest?',

  note: 'Encrypt behaviors operate only at the persistence boundary. They require pairing with a persist behavior and must be configured before initialization. Missing encryption configuration results in a fatal initialization error.',

  /**
   * Core encrypt behavior(s)
   */
  behaviors: [BehaviorIdTypes.WithAes256EncryptBehavior],

  /**
   * Stage is selectable
   */
  selectionMode: SelectionModeTypes.Single,

  /**
   * Only one encryption strategy may be active at a time
   */
  behaviorSelectionMode: BehaviorSelectionModeTypes.Single,

  /**
   * Documentation renderer
   */
  documentationComponentReference: PipelineEncryptBehaviorComponent
};
