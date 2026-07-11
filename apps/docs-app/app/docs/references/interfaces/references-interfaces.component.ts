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

import { FeatureCellExtensionComponent } from './feature-cell-extension.component';
import { FeatureCellFluentApiComponent } from './feature-cell-fluent-api.component';
import { FromObservableBehaviorExtensionComponent } from './from-observable-behavior-extension.component';
import { FromPromiseBehaviorExtensionComponent } from './from-promise-behavior-extension.component';
import { FromStreamBehaviorExtensionComponent } from './from-stream-behavior-extension.component';
import { ReactAdapterCoreFeatureCellShapeComponent } from './react-adapter-core-feature-cell-shape.component';
import { VaultSignalStateRefComponent } from './vault-signal-state-ref.component';
import { VaultStateRefComponent } from './vault-state-ref.component';
import { VaultSyncExternalStoreRefComponent } from './vault-sync-external-store-ref.component';

@Component({
  selector: 'sdux-references-interfaces-splashpage',
  standalone: true,
  imports: [
    NotFoundComponent,
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    FeatureCellExtensionComponent,
    FeatureCellFluentApiComponent,
    FromObservableBehaviorExtensionComponent,
    FromPromiseBehaviorExtensionComponent,
    FromStreamBehaviorExtensionComponent,
    ReactAdapterCoreFeatureCellShapeComponent,
    VaultSignalStateRefComponent,
    VaultStateRefComponent,
    VaultSyncExternalStoreRefComponent
  ],
  templateUrl: './references-interfaces.component.html',
  styleUrls: ['../../scss/documentation.scss']
})
export class ReferencesInterfacesLandingPageComponent {
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
