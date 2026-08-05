/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Tools/documentation/menu-generator
 */

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { NotFoundComponent } from '../../../not-found/not-found.component';

import { withAes256EncryptBehaviorComponent } from './with-aes256encrypt-behavior.component';
import { withArrayAppendMergeBehaviorComponent } from './with-array-append-merge-behavior.component';
import { withArrayByIdMergeBehaviorComponent } from './with-array-by-id-merge-behavior.component';
import { withArrayMergeBehaviorComponent } from './with-array-merge-behavior.component';
import { withArrayPushMergeBehaviorComponent } from './with-array-push-merge-behavior.component';
import { withCookieStoragePersistBehaviorComponent } from './with-cookie-storage-persist-behavior.component';
import { withCoreAfterTapBehaviorComponent } from './with-core-after-tap-behavior.component';
import { withCoreBeforeTapBehaviorComponent } from './with-core-before-tap-behavior.component';
import { withCoreEmitStateBehaviorComponent } from './with-core-emit-state-behavior.component';
import { withCoreErrorBehaviorComponent } from './with-core-error-behavior.component';
import { withCoreErrorCallbackBehaviorComponent } from './with-core-error-callback-behavior.component';
import { withCoreFilterBehaviorComponent } from './with-core-filter-behavior.component';
import { withCoreFromObservableBehaviorComponent } from './with-core-from-observable-behavior.component';
import { withCoreFromPromiseBehaviorComponent } from './with-core-from-promise-behavior.component';
import { withCoreFromStreamBehaviorComponent } from './with-core-from-stream-behavior.component';
import { withCoreObservableBehaviorComponent } from './with-core-observable-behavior.component';
import { withCorePromiseBehaviorComponent } from './with-core-promise-behavior.component';
import { withCoreReducerBehaviorComponent } from './with-core-reducer-behavior.component';
import { withCoreStateBehaviorComponent } from './with-core-state-behavior.component';
import { withCoreValueBehaviorComponent } from './with-core-value-behavior.component';
import { withDistinctUntilChangedComponent } from './with-distinct-until-changed.component';
import { withGlobalErrorPauseBehaviorComponent } from './with-global-error-pause-behavior.component';
import { withHttpResourceBehaviorComponent } from './with-http-resource-behavior.component';
import { withLocalStoragePersistBehaviorComponent } from './with-local-storage-persist-behavior.component';
import { withLookupBehaviorComponent } from './with-lookup-behavior.component';
import { withObjectDeepMergeBehaviorComponent } from './with-object-deep-merge-behavior.component';
import { withObjectShallowMergeBehaviorComponent } from './with-object-shallow-merge-behavior.component';
import { withQueryBehaviorComponent } from './with-query-behavior.component';
import { withSessionStoragePersistBehaviorComponent } from './with-session-storage-persist-behavior.component';
import { withStateCacheBehaviorComponent } from './with-state-cache-behavior.component';
import { withStepwiseFilterBehaviorComponent } from './with-stepwise-filter-behavior.component';
import { withStepwiseReducerBehaviorComponent } from './with-stepwise-reducer-behavior.component';
import { withStepwiseResolveBehaviorComponent } from './with-stepwise-resolve-behavior.component';
import { withTabSyncStateBehaviorComponent } from './with-tab-sync-state-behavior.component';

@Component({
  selector: 'sdux-references-behaviors-splashpage',
  standalone: true,
  imports: [
    NotFoundComponent,
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    withAes256EncryptBehaviorComponent,
    withArrayAppendMergeBehaviorComponent,
    withArrayByIdMergeBehaviorComponent,
    withArrayMergeBehaviorComponent,
    withArrayPushMergeBehaviorComponent,
    withCookieStoragePersistBehaviorComponent,
    withCoreAfterTapBehaviorComponent,
    withCoreBeforeTapBehaviorComponent,
    withCoreEmitStateBehaviorComponent,
    withCoreErrorBehaviorComponent,
    withCoreErrorCallbackBehaviorComponent,
    withCoreFilterBehaviorComponent,
    withCoreFromObservableBehaviorComponent,
    withCoreFromPromiseBehaviorComponent,
    withCoreFromStreamBehaviorComponent,
    withCoreObservableBehaviorComponent,
    withCorePromiseBehaviorComponent,
    withCoreReducerBehaviorComponent,
    withCoreStateBehaviorComponent,
    withCoreValueBehaviorComponent,
    withDistinctUntilChangedComponent,
    withGlobalErrorPauseBehaviorComponent,
    withHttpResourceBehaviorComponent,
    withLocalStoragePersistBehaviorComponent,
    withLookupBehaviorComponent,
    withObjectDeepMergeBehaviorComponent,
    withObjectShallowMergeBehaviorComponent,
    withQueryBehaviorComponent,
    withSessionStoragePersistBehaviorComponent,
    withStateCacheBehaviorComponent,
    withStepwiseFilterBehaviorComponent,
    withStepwiseReducerBehaviorComponent,
    withStepwiseResolveBehaviorComponent,
    withTabSyncStateBehaviorComponent
  ],
  templateUrl: './references-behaviors.component.html',
  styleUrls: ['../../scss/documentation.scss']
})
export class ReferencesBehaviorsLandingPageComponent {
  type!: string;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.route.paramMap.subscribe((params) => {
      this.type = params.get('type') ?? 'value';
      this.cdr.markForCheck(); // forces UI update
    });
  }
}
