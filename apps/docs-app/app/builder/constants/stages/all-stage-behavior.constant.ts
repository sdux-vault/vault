import { BehaviorDefinitionShape } from '../../shapes/behavior-definition.shape';
import { PipelineBuilderStateCacheConstant } from './children/behaviors/cache/pipeline-builder.cache.constant';
import { PipelineBuilderAes256EncryptConstant } from './children/behaviors/encrypt/pipeline-builder.aes-256-encrypt.constant';
import { PipelineBuilderCoreErrorCallbackConstant } from './children/behaviors/errors/pipeline-builder.emit-error.constant';
import { PipelineBuilderErrorTransformConstant } from './children/behaviors/errors/pipeline-builder.transform-error.constant';
import { PipelineBuilderCoreFilterConstant } from './children/behaviors/filters/pipeline-builder.filter.constant';
import { PipelineBuilderGlobalErrorPauseConstant } from './children/behaviors/interceptors/pipeline-builder.global-error-pause.constant';
import { PipelineBuilderLookupConstant } from './children/behaviors/lookup/pipeline-builder.lookup.constant';
import { PipelineBuilderArrayAppendMergeConstant } from './children/behaviors/merge/pipeline-builder.array-append-merge.constant';
import { PipelineBuilderArrayMergeConstant } from './children/behaviors/merge/pipeline-builder.array-merge.constant';
import { PipelineBuilderArrayPushMergeConstant } from './children/behaviors/merge/pipeline-builder.array-push-merge.constant';
import { PipelineBuilderObjectDeepMergeConstant } from './children/behaviors/merge/pipeline-builder.object-deep-merge.constant';
import { PipelineBuilderObjectShallowMergeConstant } from './children/behaviors/merge/pipeline-builder.object-shallow-merge.constant';
import { PipelineBuilderDistinctUntilChangedConstant } from './children/behaviors/operators/pipeline-builder.distinct-until-changed.constant';
import { PipelineBuilderCookieStoragePersistConstant } from './children/behaviors/persist/pipeline-builder.cookie-storage.constant';
import { PipelineBuilderLocalStoragePersistConstant } from './children/behaviors/persist/pipeline-builder.local-storage.constant';
import { PipelineBuilderSessionStoragePersistConstant } from './children/behaviors/persist/pipeline-builder.session-storage.constant';
import { PipelineBuilderCoreReducerConstant } from './children/behaviors/reducers/pipeline-builder.reducer.constant';
import { PipelineBuilderCoreFromStreamConstant } from './children/behaviors/resolve/pipeline-builder.from-stream.constant';
import { PipelineBuilderHttpResourceConstant } from './children/behaviors/resolve/pipeline-builder.http-resource.constant';
import { PipelineBuilderCoreObservableConstant } from './children/behaviors/resolve/pipeline-builder.observable.constant';
import { PipelineBuilderCorePromiseConstant } from './children/behaviors/resolve/pipeline-builder.promise.constant';
import { PipelineBuilderCoreValueConstant } from './children/behaviors/resolve/pipeline-builder.value.constant';
import { PipelineBuilderMergeStateConstant } from './children/behaviors/state/pipeline-builder.merge.constant';
import { PipelineBuilderReplaceStateConstant } from './children/behaviors/state/pipeline-builder.replace.constant';
import { PipelineBuilderCoreStateCallbackConstant } from './children/behaviors/state/pipeline-builder.state.constant';
import { PipelineBuilderStepwiseFilterConstant } from './children/behaviors/stepwise/pipeline-builder.stepwise-filter.constant';
import { PipelineBuilderStepwiseReducerConstant } from './children/behaviors/stepwise/pipeline-builder.stepwise-reducer.constant';
import { PipelineBuilderStepwiseResolveConstant } from './children/behaviors/stepwise/pipeline-builder.stepwise-resolve.constant';
import { PipelineBuilderCoreAfterTapConstant } from './children/behaviors/taps/pipeline-builder.after-tap.constant';
import { PipelineBuilderCoreBeforeTapConstant } from './children/behaviors/taps/pipeline-builder.before-tap.constant';
import { PipelineBuilderDelayConstant } from './children/controllers/pipeline-builder.delay.constant';
import { PipelineBuilderMaxFailuresConstant } from './children/controllers/pipeline-builder.max-failures.constant';
import { PipelineBuilderReplayGlobalErrorConstant } from './children/controllers/pipeline-builder.replay-global-error.constant';
import { PipelineBuilderThrottleConstant } from './children/controllers/pipeline-builder.throttle.constant';

/**
 * ─────────────────────────────────────────────────────────────
 * PIPELINE BUILDER REGISTRY
 * ─────────────────────────────────────────────────────────────
 *
 * ⚠️ CRITICAL CONTRACT
 *
 * Every Pipeline Builder behavior definition — whether:
 *
 *   • Policy Controller
 *   • Interceptor
 *   • Functional Behavior
 *   • Structural Controller
 *
 * MUST be registered in this array.
 *
 * This registry is the single source of truth used by:
 *
 *   • Behavior indexing
 *   • Stage-to-behavior mapping
 *   • UI rendering
 *   • Parameter configuration
 *   • Code emission (FileBuilder)
 *
 * If a behavior/controller is not included here:
 *
 *   • It will not appear in the Builder UI
 *   • It will not participate in stage resolution
 *   • It will not be available for code generation
 *   • It will not be initialized in behavior instances
 *
 * Do NOT register behaviors anywhere else.
 * This array defines the canonical behavior graph for the builder.
 *
 * Ordering is intentional and may affect:
 *   • Default display order
 *   • Emission grouping
 *
 * Add new behavior definitions here immediately upon creation.
 */
export const PIPELINE_BUILDER_ALL_BEHAVIOR_CONSTANT: BehaviorDefinitionShape[] =
  [
    PipelineBuilderAes256EncryptConstant,

    PipelineBuilderArrayAppendMergeConstant,
    PipelineBuilderArrayMergeConstant,
    PipelineBuilderArrayPushMergeConstant,

    PipelineBuilderCookieStoragePersistConstant,

    PipelineBuilderCoreAfterTapConstant,
    PipelineBuilderCoreBeforeTapConstant,
    PipelineBuilderCoreErrorCallbackConstant,
    PipelineBuilderCoreFilterConstant,
    PipelineBuilderCoreFromStreamConstant,
    PipelineBuilderCoreObservableConstant,
    PipelineBuilderCorePromiseConstant,
    PipelineBuilderCoreReducerConstant,
    PipelineBuilderCoreStateCallbackConstant,
    PipelineBuilderCoreValueConstant,

    PipelineBuilderDelayConstant,
    PipelineBuilderDistinctUntilChangedConstant,

    PipelineBuilderErrorTransformConstant,

    PipelineBuilderGlobalErrorPauseConstant,

    PipelineBuilderHttpResourceConstant,

    PipelineBuilderLocalStoragePersistConstant,

    PipelineBuilderLookupConstant,

    PipelineBuilderMaxFailuresConstant,
    PipelineBuilderMergeStateConstant,

    PipelineBuilderObjectDeepMergeConstant,
    PipelineBuilderObjectShallowMergeConstant,

    PipelineBuilderReplaceStateConstant,
    PipelineBuilderReplayGlobalErrorConstant,

    PipelineBuilderSessionStoragePersistConstant,
    PipelineBuilderStateCacheConstant,

    PipelineBuilderStepwiseFilterConstant,
    PipelineBuilderStepwiseReducerConstant,
    PipelineBuilderStepwiseResolveConstant,

    PipelineBuilderThrottleConstant
  ];
