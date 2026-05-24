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

import { BehaviorExtensionComponent } from './behavior-extension.component';
import { BehaviorExtFunctionComponent } from './behavior-ext-function.component';
import { BehaviorTypeComponent } from './behavior-type.component';
import { CacheTTLTypeComponent } from './cache-ttl-type.component';
import { ControllerMessageShapeComponent } from './controller-message-shape.component';
import { ControllerMessageTypeComponent } from './controller-message-type.component';
import { ControllerTypeComponent } from './controller-type.component';
import { ControllerVoteComponent } from './controller-vote.component';
import { CoreEmitStateCallbackComponent } from './core-emit-state-callback.component';
import { CoreEmitStateResultComponent } from './core-emit-state-result.component';
import { DebugWidgetEventInstantScopeTypeComponent } from './debug-widget-event-instant-scope-type.component';
import { DebugWidgetEventSourceTypeComponent } from './debug-widget-event-source-type.component';
import { DebugWidgetEventTracePhaseTypeComponent } from './debug-widget-event-trace-phase-type.component';
import { DebugWidgetLatencyCategoryTypeComponent } from './debug-widget-latency-category-type.component';
import { DecisionOutcomeTypeComponent } from './decision-outcome-type.component';
import { DeferredFactoryComponent } from './deferred-factory.component';
import { DeferredTypeComponent } from './deferred-type.component';
import { DistinctComparisonComponent } from './distinct-comparison.component';
import { EventBoundaryTypeComponent } from './event-boundary-type.component';
import { EventTypeComponent } from './event-type.component';
import { FilterFunctionComponent } from './filter-function.component';
import { FinalStateComponent } from './final-state.component';
import { InterceptorStateTypeComponent } from './interceptor-state-type.component';
import { LogLevelTypeComponent } from './log-level-type.component';
import { OperationTypeComponent } from './operation-type.component';
import { PipelinePersistValueComponent } from './pipeline-persist-value.component';
import { PipelineUpstreamValueComponent } from './pipeline-upstream-value.component';
import { PipelineValueComponent } from './pipeline-value.component';
import { ReducerFunctionComponent } from './reducer-function.component';
import { ResolveTypeComponent } from './resolve-type.component';
import { StateEmitTypeComponent } from './state-emit-type.component';
import { StateInputTypeComponent } from './state-input-type.component';
import { StepwiseFunctionComponent } from './stepwise-function.component';
import { TapCallbackComponent } from './tap-callback.component';
import { VaultErrorCallbackComponent } from './vault-error-callback.component';
import { VaultErrorKindTypeComponent } from './vault-error-kind-type.component';
import { VaultErrorNameTypeComponent } from './vault-error-name-type.component';
import { VaultErrorUsageKindTypeComponent } from './vault-error-usage-kind-type.component';

@Component({
  selector: 'sdux-references-types-splashpage',
  standalone: true,
  imports: [
    NotFoundComponent,
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    BehaviorExtensionComponent,
    BehaviorExtFunctionComponent,
    BehaviorTypeComponent,
    CacheTTLTypeComponent,
    ControllerMessageShapeComponent,
    ControllerMessageTypeComponent,
    ControllerTypeComponent,
    ControllerVoteComponent,
    CoreEmitStateCallbackComponent,
    CoreEmitStateResultComponent,
    DebugWidgetEventInstantScopeTypeComponent,
    DebugWidgetEventSourceTypeComponent,
    DebugWidgetEventTracePhaseTypeComponent,
    DebugWidgetLatencyCategoryTypeComponent,
    DecisionOutcomeTypeComponent,
    DeferredFactoryComponent,
    DeferredTypeComponent,
    DistinctComparisonComponent,
    EventBoundaryTypeComponent,
    EventTypeComponent,
    FilterFunctionComponent,
    FinalStateComponent,
    InterceptorStateTypeComponent,
    LogLevelTypeComponent,
    OperationTypeComponent,
    PipelinePersistValueComponent,
    PipelineUpstreamValueComponent,
    PipelineValueComponent,
    ReducerFunctionComponent,
    ResolveTypeComponent,
    StateEmitTypeComponent,
    StateInputTypeComponent,
    StepwiseFunctionComponent,
    TapCallbackComponent,
    VaultErrorCallbackComponent,
    VaultErrorKindTypeComponent,
    VaultErrorNameTypeComponent,
    VaultErrorUsageKindTypeComponent
  ],
  templateUrl: './references-types.component.html',
  styleUrls: ['../../scss/example.scss']
})
export class ReferencesTypesLandingPageComponent {
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
