import { BehaviorSelectionModeTypes } from 'apps/docs-app/app/builder/types/behavior-selection-mode.type';
import { PipelinePersistComponent } from '../../../../docs/pipeline/behaviors/components/persist/persist.pipeline.component';
import { StageDefinitionShape } from '../../../shapes/stage-definition.shape';
import { BehaviorIdTypes } from '../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../types/id/stage-id.type';
import { SelectionModeTypes } from '../../../types/selection-mode.type';
import { StageLabelType } from '../../../types/stage-label.type';

export const PipelineBuilderPersistStage: StageDefinitionShape = {
  id: StageIdTypes.Persist,

  /**
   * Output pipeline stage
   */

  label: StageLabelType.Persist,

  description:
    'Persist behaviors write finalized FeatureCell state to durable storage mechanisms such as localStorage, sessionStorage, cookies, or custom persistence targets. The Persist stage runs after state commitment and does not influence pipeline computation.',

  question:
    'Do you want committed state to survive page reloads, browser restarts, or tab refreshes?',

  note: 'Persist behaviors operate at the output boundary of the pipeline. They never modify state, never influence control flow, and follow a strict fail-safe model. When no persist behavior is configured, this stage is skipped.',

  /**
   * Built-in persist behaviors
   */
  behaviors: [
    BehaviorIdTypes.WithCookieStoragePersistBehavior,
    BehaviorIdTypes.WithLocalStoragePersistBehavior,
    BehaviorIdTypes.WithSessionStoragePersistBehavior
  ],

  /**
   * Multiple persist behaviors may be stacked
   */
  selectionMode: SelectionModeTypes.Single,

  /**
   * Allow multiple persistence strategies
   */
  behaviorSelectionMode: BehaviorSelectionModeTypes.Multiple,

  /**
   * Documentation renderer
   */
  documentationComponentReference: PipelinePersistComponent
};
