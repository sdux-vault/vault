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

import { BehaviorMetaBaseShapeComponent } from './behavior-meta-base-shape.component';
import { ControllerAttemptMessageShapeComponent } from './controller-attempt-message-shape.component';
import { ControllerDecisionShapeComponent } from './controller-decision-shape.component';
import { ControllerFailMessageShapeComponent } from './controller-fail-message-shape.component';
import { ControllerFinalizeMessageShapeComponent } from './controller-finalize-message-shape.component';
import { ControllerMetaShapeComponent } from './controller-meta-shape.component';
import { ControllerSuccessMessageShapeComponent } from './controller-success-message-shape.component';
import { DebugWidgetDumpShapeComponent } from './debug-widget-dump-shape.component';
import { DebugWidgetEventShapeComponent } from './debug-widget-event-shape.component';
import { DebugWidgetEventStatShapeComponent } from './debug-widget-event-stat-shape.component';
import { DebugWidgetLicenseSummaryShapeComponent } from './debug-widget-license-summary-shape.component';
import { DebugWidgetLongTasksShapeComponent } from './debug-widget-long-tasks-shape.component';
import { DebugWidgetRegistryShapeComponent } from './debug-widget-registry-shape.component';
import { DebugWidgetTraceEventArgsShapeComponent } from './debug-widget-trace-event-args-shape.component';
import { DebugWidgetTraceEventShapeComponent } from './debug-widget-trace-event-shape.component';
import { EventCandidateShapeComponent } from './event-candidate-shape.component';
import { EventShapeComponent } from './event-shape.component';
import { FeatureCellBaseShapeComponent } from './feature-cell-base-shape.component';
import { FeatureCellShapeComponent } from './feature-cell-shape.component';
import { HttpResourceRefShapeComponent } from './http-resource-ref-shape.component';
import { NonResolveBehaviorMetaShapeComponent } from './non-resolve-behavior-meta-shape.component';
import { ResolveBehaviorMetaShapeComponent } from './resolve-behavior-meta-shape.component';
import { SDuXShapeComponent } from './s-du-x-shape.component';
import { SerializedFeatureCellShapeComponent } from './serialized-feature-cell-shape.component';
import { StateEmitSnapshotShapeComponent } from './state-emit-snapshot-shape.component';
import { StateInputShapeComponent } from './state-input-shape.component';
import { StateSnapshotShapeComponent } from './state-snapshot-shape.component';
import { StepwiseBehaviorDecisionShapeComponent } from './stepwise-behavior-decision-shape.component';
import { VaultErrorShapeComponent } from './vault-error-shape.component';
import { VaultLicensePayloadShapeComponent } from './vault-license-payload-shape.component';
import { VaultLicensingShapeComponent } from './vault-licensing-shape.component';
import { VaultRegistrationEntityShapeComponent } from './vault-registration-entity-shape.component';
import { VaultRegistrationFluentApiShapeComponent } from './vault-registration-fluent-api-shape.component';
import { VaultRegistrationShapeComponent } from './vault-registration-shape.component';

@Component({
  selector: 'sdux-references-shapes-splashpage',
  standalone: true,
  imports: [
    NotFoundComponent,
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    BehaviorMetaBaseShapeComponent,
    ControllerAttemptMessageShapeComponent,
    ControllerDecisionShapeComponent,
    ControllerFailMessageShapeComponent,
    ControllerFinalizeMessageShapeComponent,
    ControllerMetaShapeComponent,
    ControllerSuccessMessageShapeComponent,
    DebugWidgetDumpShapeComponent,
    DebugWidgetEventShapeComponent,
    DebugWidgetEventStatShapeComponent,
    DebugWidgetLicenseSummaryShapeComponent,
    DebugWidgetLongTasksShapeComponent,
    DebugWidgetRegistryShapeComponent,
    DebugWidgetTraceEventArgsShapeComponent,
    DebugWidgetTraceEventShapeComponent,
    EventCandidateShapeComponent,
    EventShapeComponent,
    FeatureCellBaseShapeComponent,
    FeatureCellShapeComponent,
    HttpResourceRefShapeComponent,
    NonResolveBehaviorMetaShapeComponent,
    ResolveBehaviorMetaShapeComponent,
    SDuXShapeComponent,
    SerializedFeatureCellShapeComponent,
    StateEmitSnapshotShapeComponent,
    StateInputShapeComponent,
    StateSnapshotShapeComponent,
    StepwiseBehaviorDecisionShapeComponent,
    VaultErrorShapeComponent,
    VaultLicensePayloadShapeComponent,
    VaultLicensingShapeComponent,
    VaultRegistrationEntityShapeComponent,
    VaultRegistrationFluentApiShapeComponent,
    VaultRegistrationShapeComponent
  ],
  templateUrl: './references-shapes.component.html',
  styleUrls: ['../../scss/documentation.scss']
})
export class ReferencesShapesLandingPageComponent {
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
