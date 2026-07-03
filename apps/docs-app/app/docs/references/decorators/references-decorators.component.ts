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

import { FeatureCellComponent } from './feature-cell.component';
import { VaultBehaviorComponent } from './vault-behavior.component';
import { VaultControllerComponent } from './vault-controller.component';

@Component({
  selector: 'sdux-references-decorators-splashpage',
  standalone: true,
  imports: [
    NotFoundComponent,
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    FeatureCellComponent,
    VaultBehaviorComponent,
    VaultControllerComponent
  ],
  templateUrl: './references-decorators.component.html',
  styleUrls: ['../../scss/documentation.scss']
})
export class ReferencesDecoratorsLandingPageComponent {
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
