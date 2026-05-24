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

import { BEHAVIOR_METAComponent } from './behavior_meta.component';
import { BehaviorTypesComponent } from './behavior-types.component';
import { CacheTTLComponent } from './cache-ttl.component';
import { CONTROLLER_METAComponent } from './controller_meta.component';
import { ControllerMessageTypesComponent } from './controller-message-types.component';
import { ControllerTypesComponent } from './controller-types.component';
import { ControllerVotesComponent } from './controller-votes.component';
import { cryptoPlatformComponent } from './crypto-platform.component';
import { DebugWidgetEventInstantScopeTypesComponent } from './debug-widget-event-instant-scope-types.component';
import { DebugWidgetEventSourceTypesComponent } from './debug-widget-event-source-types.component';
import { DebugWidgetEventTracePhaseTypesComponent } from './debug-widget-event-trace-phase-types.component';
import { DebugWidgetLatencyCategoryTypesComponent } from './debug-widget-latency-category-types.component';
import { DecisionOutcomeTypesComponent } from './decision-outcome-types.component';
import { DevModeComponent } from './dev-mode.component';
import { DEVTOOLS_AGGREGATE_KEY_CONSTANTComponent } from './devtools_aggregate_key_constant.component';
import { DEVTOOLS_LOGGING_KEY_CONSTANTComponent } from './devtools_logging_key_constant.component';
import { EventBoundaryTypesComponent } from './event-boundary-types.component';
import { EventTypesComponent } from './event-types.component';
import { isTestEnvComponent } from './is-test-env.component';
import { LogLevelTypesComponent } from './log-level-types.component';
import { OperationTypesComponent } from './operation-types.component';
import { ResolveTypesComponent } from './resolve-types.component';
import { StateEmitTypesComponent } from './state-emit-types.component';
import { VAULT_CLEAR_STATEComponent } from './vault_clear_state.component';
import { VAULT_CONTINUEComponent } from './vault_continue.component';
import { VAULT_NOOPComponent } from './vault_noop.component';
import { VAULT_STOPComponent } from './vault_stop.component';
import { VaultErrorKindTypesComponent } from './vault-error-kind-types.component';
import { VaultErrorNameTypesComponent } from './vault-error-name-types.component';
import { VaultErrorUsageKindTypesComponent } from './vault-error-usage-kind-types.component';

@Component({
  selector: 'sdux-references-const-splashpage',
  standalone: true,
  imports: [
    NotFoundComponent,
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    BEHAVIOR_METAComponent,
    BehaviorTypesComponent,
    CacheTTLComponent,
    CONTROLLER_METAComponent,
    ControllerMessageTypesComponent,
    ControllerTypesComponent,
    ControllerVotesComponent,
    cryptoPlatformComponent,
    DebugWidgetEventInstantScopeTypesComponent,
    DebugWidgetEventSourceTypesComponent,
    DebugWidgetEventTracePhaseTypesComponent,
    DebugWidgetLatencyCategoryTypesComponent,
    DecisionOutcomeTypesComponent,
    DevModeComponent,
    DEVTOOLS_AGGREGATE_KEY_CONSTANTComponent,
    DEVTOOLS_LOGGING_KEY_CONSTANTComponent,
    EventBoundaryTypesComponent,
    EventTypesComponent,
    isTestEnvComponent,
    LogLevelTypesComponent,
    OperationTypesComponent,
    ResolveTypesComponent,
    StateEmitTypesComponent,
    VAULT_CLEAR_STATEComponent,
    VAULT_CONTINUEComponent,
    VAULT_NOOPComponent,
    VAULT_STOPComponent,
    VaultErrorKindTypesComponent,
    VaultErrorNameTypesComponent,
    VaultErrorUsageKindTypesComponent
  ],
  templateUrl: './references-const.component.html',
  styleUrls: ['../../scss/example.scss']
})
export class ReferencesConstLandingPageComponent {
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
