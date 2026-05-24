import { StageDefinitionShape } from '../../shapes/stage-definition.shape';
import { PipelineBuilderCacheStage } from './cache/pipeline-builder.cache.stage';
import { PipelineBuilderPolicyStage } from './controllers/pipeline-builder.policy.stage';
import { PipelineBuilderStepwisePolicyStage } from './controllers/pipeline-stepwise.policy.stage';
import { PipelineBuilderEncryptStage } from './encrypt/pipeline-builder.encrypt.stage';
import { PipelineBuilderErrorStage } from './errors/pipeline-builder.errors.stage';
import { PipelineBuilderFilterStage } from './filters/pipeline-builder.filters.stage';
import { PipelineBuilderInterceptorStage } from './interceptors/pipeline-builder.interceptors.stage';
import { PipelineBuilderLookupStage } from './lookup/pipeline-builder.lookup.stage';
import { PipelineBuilderMergeStage } from './merge/pipeline-builder.merge.stage';
import { PipelineBuilderOperatorStage } from './operators/pipeline-builder.operator.stage';
import { PipelineBuilderPersistStage } from './persist/pipeline-builder.persist.stage';
import { PipelineBuilderReducerStage } from './reducers/pipeline-builder.reducers.stage';
import { PipelineBuilderResolveStage } from './resolve/pipeline-builder.resolve.stage.constant';
import { PipelineBuilderStateStage } from './state/pipeline-builder.state.stage';
import { PipelineBuilderUpdateStrategyStage } from './state/pipeline-builder.update-strategy.stage';
import { PipelineBuilderTapStage } from './tap/pipeline-builder.taps.stage';

/**
 * These are displayed in this order
 */
export const PIPELINE_BUILDER_ALL_STAGE_CONSTANT: StageDefinitionShape[] = [
  PipelineBuilderPolicyStage,
  PipelineBuilderInterceptorStage,
  PipelineBuilderResolveStage,
  PipelineBuilderUpdateStrategyStage,
  PipelineBuilderMergeStage,
  PipelineBuilderOperatorStage,
  PipelineBuilderFilterStage,
  PipelineBuilderTapStage,
  PipelineBuilderReducerStage,
  PipelineBuilderEncryptStage,
  PipelineBuilderPersistStage,
  PipelineBuilderErrorStage,
  PipelineBuilderStateStage,
  PipelineBuilderStepwisePolicyStage,
  PipelineBuilderCacheStage,
  PipelineBuilderLookupStage
];
