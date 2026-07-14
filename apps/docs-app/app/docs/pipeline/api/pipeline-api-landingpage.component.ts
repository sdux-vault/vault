import { Component, ViewEncapsulation } from '@angular/core';
import { PipelineRoutingDirective } from '../directives/pipeline-routing.directive';
import { PipelineAngularApiOverviewComponent } from './angular/angular.api.component';
import { PipelineAtFeatureCellComponent } from './at-feature-cell/at-feature-cell.api.component';
import { PipelineCellBuilderComponent } from './cell-builder/cell-builder.api.component';
import { PipelineFeatureCellApiComponent } from './feature-cell-methods/feature-cell.api.component';
import { PipelineAfterTapsMethodComponent } from './feature-cell-methods/methods/after-taps/after-taps.method.component';
import { PipelineBeforeTapsMethodComponent } from './feature-cell-methods/methods/before-tabs/before-taps.method.component';
import { PipelineDestroyMethodComponent } from './feature-cell-methods/methods/destroy/destroy.method.component';
import { PipelineDestroyedStreamMethodComponent } from './feature-cell-methods/methods/destroyed-stream/destroyed-stream.method.component';
import { PipelineEmitStatesMethodComponent } from './feature-cell-methods/methods/emit-states/emit-states.method.component';
import { PipelineErrorsMethodComponent } from './feature-cell-methods/methods/errors/errors.method.component';
import { PipelineFiltersMethodComponent } from './feature-cell-methods/methods/filters/filters.method.component';
import { PipelineFromStreamMethodComponent } from './feature-cell-methods/methods/from-stream/from-stream.method.component';
import { PipelineHydrateMethodComponent } from './feature-cell-methods/methods/hydrate/hydrate.method.component';
import { PipelineInitializeMethodComponent } from './feature-cell-methods/methods/initialize/initialize.method.component';
import { PipelineInterceptorsMethodComponent } from './feature-cell-methods/methods/interceptors/interceptors.method.component';
import { PipelineKeyPropertyComponent } from './feature-cell-methods/methods/key/key.property.component';
import { PipelineMergeStateMethodComponent } from './feature-cell-methods/methods/merge-state/merge-state.method.component';
import { PipelineOperatorsMethodComponent } from './feature-cell-methods/methods/operators/operators.method.component';
import { PipelineReducersMethodComponent } from './feature-cell-methods/methods/reducers/reducers.method.component';
import { PipelineReplaceStateMethodComponent } from './feature-cell-methods/methods/replace-state/replace-state.method.component';
import { PipelineResetStreamMethodComponent } from './feature-cell-methods/methods/reset-stream/reset-stream.method.component';
import { PipelineResetMethodComponent } from './feature-cell-methods/methods/reset/reset.method.component';
import { PipelineStateStreamMethodComponent } from './feature-cell-methods/methods/state-stream/state-stream.method.component';
import { PipelineStatePropertyComponent } from './feature-cell-methods/methods/state/state.property.component';
import { PipelineUseSyncExternalStoreMethodComponent } from './feature-cell-methods/methods/use-sync-external-store/use-sync-external-store.method.component';
import { PipelineFeatureCellComponent } from './feature-cell/feature-cell.api.component';
import { PipelineInjectVaultComponent } from './inject-vault/inject-vault.api.component';
import { PipelineProvideFeatureCellComponent } from './provide-feature-cell/provide-feature-cell.api.component';
import { PipelineProvideVaultComponent } from './provide-vault/provide-vault.api.component';
import { PipelineVaultComponent } from './vault/vault.api.component';

@Component({
  selector: 'sdux-pipeline-api-landingpage',
  standalone: true,
  imports: [
    PipelineProvideVaultComponent,
    PipelineProvideFeatureCellComponent,
    PipelineFeatureCellApiComponent,
    PipelineAfterTapsMethodComponent,
    PipelineCellBuilderComponent,
    PipelineBeforeTapsMethodComponent,
    PipelineDestroyMethodComponent,
    PipelineDestroyedStreamMethodComponent,
    PipelineErrorsMethodComponent,
    PipelineFiltersMethodComponent,
    PipelineInitializeMethodComponent,
    PipelineInterceptorsMethodComponent,
    PipelineKeyPropertyComponent,
    PipelineReducersMethodComponent,
    PipelineResetStreamMethodComponent,
    PipelineResetMethodComponent,
    PipelineStatePropertyComponent,
    PipelineStateStreamMethodComponent,
    PipelineUseSyncExternalStoreMethodComponent,
    PipelineAtFeatureCellComponent,
    PipelineInjectVaultComponent,
    PipelineHydrateMethodComponent,
    PipelineVaultComponent,
    PipelineFeatureCellComponent,
    PipelineEmitStatesMethodComponent,
    PipelineMergeStateMethodComponent,
    PipelineReplaceStateMethodComponent,
    PipelineOperatorsMethodComponent,
    PipelineFromStreamMethodComponent,
    PipelineAngularApiOverviewComponent
  ],
  templateUrl: './pipeline-api-landingpage.component.html',
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineApiLandingComponent extends PipelineRoutingDirective {}
