import { BehaviorSelectionModeTypes } from 'apps/docs-app/app/builder/types/behavior-selection-mode.type';
import { PipelineStateCacheBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/entity-access/state-cache/state-cache.behavior.component';
import { StageDefinitionShape } from '../../../shapes/stage-definition.shape';
import { BehaviorIdTypes } from '../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../types/id/stage-id.type';
import { SelectionModeTypes } from '../../../types/selection-mode.type';
import { StageLabelType } from '../../../types/stage-label.type';

export const PipelineBuilderCacheStage: StageDefinitionShape = {
  id: StageIdTypes.Cache,

  label: StageLabelType.Cache,

  description:
    'State Cache behaviors extend a FeatureCell with TTL-based entity caching. ' +
    'Cache lookup, cache-miss resolution, and refresh are coordinated through the state pipeline while preserving a single authoritative source of truth.',

  question:
    'Do you want to enable TTL-based entity caching with coordinated lookup and refresh behavior?',

  note: 'State Cache operates as an extension behavior. It does not mutate state directly, does not bypass pipeline execution, and only records finalized state emissions. When not configured, no cache surface is exposed.',

  /**
   * Built-in cache behavior
   */
  behaviors: [BehaviorIdTypes.WithStateCacheBehavior],

  /**
   * Only one cache behavior allowed
   */
  selectionMode: SelectionModeTypes.Single,

  /**
   * Only one cache strategy per FeatureCell
   */
  behaviorSelectionMode: BehaviorSelectionModeTypes.Single,

  /**
   * Documentation renderer
   */
  documentationComponentReference: PipelineStateCacheBehaviorComponent
};
