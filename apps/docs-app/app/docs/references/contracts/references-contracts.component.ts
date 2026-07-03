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

import { AfterTapBehaviorContractComponent } from './after-tap-behavior-contract.component';
import { BeforeTapBehaviorContractComponent } from './before-tap-behavior-contract.component';
import { BehaviorClassContractComponent } from './behavior-class-contract.component';
import { BehaviorContractComponent } from './behavior-contract.component';
import { CellBuilderContractComponent } from './cell-builder-contract.component';
import { ControllerClassContractComponent } from './controller-class-contract.component';
import { ControllerContractComponent } from './controller-contract.component';
import { CoreEmitStateBehaviorContractComponent } from './core-emit-state-behavior-contract.component';
import { CoreErrorBehaviorContractComponent } from './core-error-behavior-contract.component';
import { CoreStateBehaviorContractComponent } from './core-state-behavior-contract.component';
import { DebugWidgetEngineContractComponent } from './debug-widget-engine-contract.component';
import { DevPipelineObserverBehaviorContractComponent } from './dev-pipeline-observer-behavior-contract.component';
import { EncryptBehaviorContractComponent } from './encrypt-behavior-contract.component';
import { ErrorCallbackBehaviorContractComponent } from './error-callback-behavior-contract.component';
import { ErrorTransformBehaviorContractComponent } from './error-transform-behavior-contract.component';
import { EventBusContractComponent } from './event-bus-contract.component';
import { FilterBehaviorContractComponent } from './filter-behavior-contract.component';
import { InterceptorBehaviorClassContractComponent } from './interceptor-behavior-class-contract.component';
import { InterceptorBehaviorContractComponent } from './interceptor-behavior-contract.component';
import { MergeBehaviorContractComponent } from './merge-behavior-contract.component';
import { OperatorBehaviorContractComponent } from './operator-behavior-contract.component';
import { OperatorsBehaviorClassContractComponent } from './operators-behavior-class-contract.component';
import { PersistBehaviorContractComponent } from './persist-behavior-contract.component';
import { ReduceBehaviorContractComponent } from './reduce-behavior-contract.component';
import { ResolveBehaviorContractComponent } from './resolve-behavior-contract.component';
import { StepwiseBehaviorContractComponent } from './stepwise-behavior-contract.component';
import { VaultErrorServiceContractComponent } from './vault-error-service-contract.component';
import { VaultMonitorContractComponent } from './vault-monitor-contract.component';
import { VaultPrivateErrorServiceContractComponent } from './vault-private-error-service-contract.component';

@Component({
  selector: 'sdux-references-contracts-splashpage',
  standalone: true,
  imports: [
    NotFoundComponent,
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    AfterTapBehaviorContractComponent,
    BeforeTapBehaviorContractComponent,
    BehaviorClassContractComponent,
    BehaviorContractComponent,
    CellBuilderContractComponent,
    ControllerClassContractComponent,
    ControllerContractComponent,
    CoreEmitStateBehaviorContractComponent,
    CoreErrorBehaviorContractComponent,
    CoreStateBehaviorContractComponent,
    DebugWidgetEngineContractComponent,
    DevPipelineObserverBehaviorContractComponent,
    EncryptBehaviorContractComponent,
    ErrorCallbackBehaviorContractComponent,
    ErrorTransformBehaviorContractComponent,
    EventBusContractComponent,
    FilterBehaviorContractComponent,
    InterceptorBehaviorClassContractComponent,
    InterceptorBehaviorContractComponent,
    MergeBehaviorContractComponent,
    OperatorBehaviorContractComponent,
    OperatorsBehaviorClassContractComponent,
    PersistBehaviorContractComponent,
    ReduceBehaviorContractComponent,
    ResolveBehaviorContractComponent,
    StepwiseBehaviorContractComponent,
    VaultErrorServiceContractComponent,
    VaultMonitorContractComponent,
    VaultPrivateErrorServiceContractComponent
  ],
  templateUrl: './references-contracts.component.html',
  styleUrls: ['../../scss/documentation.scss']
})
export class ReferencesContractsLandingPageComponent {
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
