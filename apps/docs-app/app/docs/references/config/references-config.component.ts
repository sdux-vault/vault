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

import { ArrayByIdMergeConfigComponent } from './array-by-id-merge-config.component';
import { FeatureCellConfigComponent } from './feature-cell-config.component';
import { InsightConfigComponent } from './insight-config.component';
import { MergeConfigComponent } from './merge-config.component';
import { ObjectDeepMergeConfigComponent } from './object-deep-merge-config.component';
import { VaultConfigComponent } from './vault-config.component';

@Component({
  selector: 'sdux-references-config-splashpage',
  standalone: true,
  imports: [
    NotFoundComponent,
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    ArrayByIdMergeConfigComponent,
    FeatureCellConfigComponent,
    InsightConfigComponent,
    MergeConfigComponent,
    ObjectDeepMergeConfigComponent,
    VaultConfigComponent
  ],
  templateUrl: './references-config.component.html',
  styleUrls: ['../../scss/documentation.scss']
})
export class ReferencesConfigLandingPageComponent {
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
