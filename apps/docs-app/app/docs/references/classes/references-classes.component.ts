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

import { EventBusInstanceComponent } from './event-bus-instance.component';
import { FeatureCellClassComponent } from './feature-cell-class.component';
import { SvelteFeatureCellAdapterComponent } from './svelte-feature-cell-adapter.component';
import { VaultEncryptionIntegrityErrorComponent } from './vault-encryption-integrity-error.component';
import { VaultErrorComponent } from './vault-error.component';
import { VaultLicenseErrorComponent } from './vault-license-error.component';
import { VaultUsageErrorComponent } from './vault-usage-error.component';
import { VaultUsagePromiseErrorComponent } from './vault-usage-promise-error.component';
import { VaultUsagePromiseFactoryRequiredErrorComponent } from './vault-usage-promise-factory-required-error.component';

@Component({
  selector: 'sdux-references-classes-splashpage',
  standalone: true,
  imports: [
    NotFoundComponent,
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    EventBusInstanceComponent,
    FeatureCellClassComponent,
    SvelteFeatureCellAdapterComponent,
    VaultEncryptionIntegrityErrorComponent,
    VaultErrorComponent,
    VaultLicenseErrorComponent,
    VaultUsageErrorComponent,
    VaultUsagePromiseErrorComponent,
    VaultUsagePromiseFactoryRequiredErrorComponent
  ],
  templateUrl: './references-classes.component.html',
  styleUrls: ['../../scss/documentation.scss']
})
export class ReferencesClassesLandingPageComponent {
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
