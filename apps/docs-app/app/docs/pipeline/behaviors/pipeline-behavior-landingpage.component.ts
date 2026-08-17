import { Component, ViewEncapsulation } from '@angular/core';
import { PipelineRoutingDirective } from '../directives/pipeline-routing.directive';
import { PipelineDispatchBehaviorComponent } from './components/deprecated/dispatcher/dispatch.pipeline.component';
import { PipelineSelectorsBehaviorComponent } from './components/deprecated/selectors/selectors.pipeline.component';
import { PipelineEncryptAes256BehaviorComponent } from './components/encrypt/aes-256/aes-256.behavior.component';
import { PipelineEncryptBehaviorComponent } from './components/encrypt/encrypt.pipeline.component';
import { PipelineEntityAccessComponent } from './components/entity-access/entity-access.pipeline.component';
import { PipelineLookupBehaviorComponent } from './components/entity-access/lookup/lookup.behavior.component';
import { PipelineQueryBehaviorComponent } from './components/entity-access/query/query.behavior.component';
import { PipelineStateCacheBehaviorComponent } from './components/entity-access/state-cache/state-cache.behavior.component';
import { PipelineCoreErrorCallbackBehaviorComponent } from './components/errors/with-core-error-callback/with-core-error-callback.component';
import { PipelineCoreErrorBehaviorComponent } from './components/errors/with-core-error.behavior.component';
import { PipelineErrorTransformBehaviorComponent } from './components/errors/with-error-transform/with-error-transform.component';
import { PipelineFiltersBehaviorComponent } from './components/filters/filters.pipeline.component';
import { PipelineInitializeBehaviorComponent } from './components/initialize/initialize.pipeline.component';
import { PipelineInterceptorsBehaviorComponent } from './components/interceptors/interceptors.pipeline.component';
import { PipelineInterceptorsWithRxJSComponent } from './components/interceptors/rxjs/rxjs.pipeline.component';
import { PipelineInterceptorsWithGlobalErrorPauseBehaviorComponent } from './components/interceptors/with-global-error-pause/with-global-error-pause.pipeline.component';
import { PipelineArrayAppendMergeBehaviorComponent } from './components/merge/array-append-merge/array.append-merge,pipeline.component';
import { PipelineArrayByIdMergeBehaviorComponent } from './components/merge/array-by-id-merge/array-by-id-merge.pipeline.component';
import { PipelineArrayMergeBehaviorComponent } from './components/merge/array-merge/array-merge.pipeline.component';
import { PipelineArrayPushMergeBehaviorComponent } from './components/merge/array-push-merge/array-push-merge.pipeline.component';
import { PipelineMergeBehaviorComponent } from './components/merge/merge.pipeline.component';
import { PipelineObjectDeepMergeBehaviorComponent } from './components/merge/object-deep-mrge/object-deep-merge.pipeline.component';
import { PipelineObjectShallowMergeBehaviorComponent } from './components/merge/object-shallow-merge/object-shallow-merge.pipeline.component';
import { PipelineOperatorsWithDistinctUntilChangedComponent } from './components/operators/distinct-until-changed/with-distinct-until-changed.pipeline.component';
import { PipelineOperatorsComponent } from './components/operators/operators.pipeline.component';
import { PipelineCookieStoragePersistComponent } from './components/persist/cookie-storage/cookie-storage.pipeline.component';
import { PipelineLocalStoragePersistComponent } from './components/persist/local-storage/local-storage.pipeline.component';
import { PipelinePersistComponent } from './components/persist/persist.pipeline.component';
import { PipelineSessionStoragePersistComponent } from './components/persist/session-storage/session-storage.pipeline.component';
import { PipelineReducersBehaviorComponent } from './components/reducers/reducers.pipeline.component';
import { PipelineCoreFromDeferredBehaviorComponent } from './components/resolve/core-from-deferred/core-from-deferred.pipeline.component';
import { PipelineCoreFromObservableBehaviorComponent } from './components/resolve/core-from-observable/core-from-observable.pipeline.component';
import { PipelineCoreFromPromiseBehaviorComponent } from './components/resolve/core-from-promise/core-from-promise.pipeline.component';
import { PipelineCoreFromStreamBehaviorComponent } from './components/resolve/core-from-stream/core-from-stream.pipeline.component';
import { PipelineCoreObservableBehaviorComponent } from './components/resolve/core-observable/core-observable.pipeline.component';
import { PipelineCorePromiseBehaviorComponent } from './components/resolve/core-promise/core-promise.pipeline.component';
import { PipelineCoreValueBehaviorComponent } from './components/resolve/core-value/core-value.pipeline.component';
import { PipelineHttpResourceBehaviorComponent } from './components/resolve/http-resource/http-resource.pipeline.component';
import { PipelineResolveComponent } from './components/resolve/resolve.pipeline.component';
import { PipelineUpdatingStateBehaviorComponent } from './components/state/updating-state/updating-state.pipeline.component';
import { PipelineCoreEmitStateBehaviorComponent } from './components/state/with-core-emit-state/with-core-emit-state.pipeline.component';
import { PipelineCoreStateBehaviorComponent } from './components/state/with-core-state.pipeline.component';
import { PipelineStepwiseBehaviorComponent } from './components/stepwise/stepwise.pipeline.component';
import { PipelineWithStepwiseFilterBehaviorComponent } from './components/stepwise/with-stepwise-filter/with-stepwise-filter.pipeline.component';
import { PipelineWithStepwiseReducerBehaviorComponent } from './components/stepwise/with-stepwise-reducer/with-stepwise-reducer.pipeline.component';
import { PipelineWithStepwiseResolveBehaviorComponent } from './components/stepwise/with-stepwise-resolve/with-stepwise-resolve.pipeline.component';
import { PipelineTabSyncBehaviorComponent } from './components/tab-sync/tab-sync.pipeline.component';
import { PipelineAfterTapBehaviorComponent } from './components/taps/after-tap/after-tap.pipeline.component';
import { PipelineBeforeTapBehaviorComponent } from './components/taps/before-tap/before-tap.pipeline.component';
import { PipelineCoreTapBehaviorComponent } from './components/taps/with-core-tap.pipeline.component';
import { PipelineWhatIsABehaviorComponent } from './what-is-a-behavior/what-is-a-behavior.pipeline.component';

@Component({
  selector: 'sdux-pipeline-behavior-landingpage',
  standalone: true,
  imports: [
    PipelineEncryptAes256BehaviorComponent,
    PipelineCoreErrorBehaviorComponent,
    PipelineInterceptorsBehaviorComponent,
    PipelineInterceptorsWithRxJSComponent,
    PipelineResolveComponent,
    PipelineFiltersBehaviorComponent,
    PipelineWithStepwiseResolveBehaviorComponent,
    PipelineReducersBehaviorComponent,
    PipelineWithStepwiseFilterBehaviorComponent,
    PipelineWithStepwiseReducerBehaviorComponent,
    PipelineBeforeTapBehaviorComponent,
    PipelineAfterTapBehaviorComponent,
    PipelineMergeBehaviorComponent,
    PipelineStepwiseBehaviorComponent,
    PipelineErrorTransformBehaviorComponent,
    PipelineCoreErrorCallbackBehaviorComponent,
    PipelineEncryptBehaviorComponent,
    PipelineStateCacheBehaviorComponent,
    PipelineOperatorsComponent,
    PipelineLookupBehaviorComponent,
    PipelineOperatorsWithDistinctUntilChangedComponent,
    PipelineArrayMergeBehaviorComponent,
    PipelineArrayAppendMergeBehaviorComponent,
    PipelineArrayPushMergeBehaviorComponent,
    PipelineObjectDeepMergeBehaviorComponent,
    PipelineObjectShallowMergeBehaviorComponent,
    PipelinePersistComponent,
    PipelineCookieStoragePersistComponent,
    PipelineTabSyncBehaviorComponent,
    PipelineLocalStoragePersistComponent,
    PipelineSessionStoragePersistComponent,
    PipelineInterceptorsWithGlobalErrorPauseBehaviorComponent,
    PipelineCoreEmitStateBehaviorComponent,
    PipelineCoreStateBehaviorComponent,
    PipelineCorePromiseBehaviorComponent,
    PipelineCoreObservableBehaviorComponent,
    PipelineCoreValueBehaviorComponent,
    PipelineCoreFromStreamBehaviorComponent,
    PipelineInitializeBehaviorComponent,
    PipelineHttpResourceBehaviorComponent,
    PipelineCoreFromPromiseBehaviorComponent,
    PipelineCoreFromObservableBehaviorComponent,
    PipelineCoreFromDeferredBehaviorComponent,
    PipelineSelectorsBehaviorComponent,
    PipelineDispatchBehaviorComponent,
    PipelineWhatIsABehaviorComponent,
    PipelineCoreTapBehaviorComponent,
    PipelineUpdatingStateBehaviorComponent,
    PipelineQueryBehaviorComponent,
    PipelineEntityAccessComponent,
    PipelineArrayByIdMergeBehaviorComponent
  ],
  templateUrl: './pipeline-behavior-landingpage.component.html',
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineBehaviorLandingComponent extends PipelineRoutingDirective {}
