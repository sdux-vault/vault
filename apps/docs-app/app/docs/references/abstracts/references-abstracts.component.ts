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

import { AbstractActiveControllerComponent } from './abstract-active-controller.component';
import { AbstractErrorCallbackBehaviorComponent } from './abstract-error-callback-behavior.component';
import { AbstractErrorTransformBehaviorComponent } from './abstract-error-transform-behavior.component';
import { LicensingAbstractComponent } from './licensing-abstract.component';
import { TapAbstractBehaviorComponent } from './tap-abstract-behavior.component';

@Component({
  selector: 'sdux-references-abstracts-splashpage',
  standalone: true,
  imports: [
    NotFoundComponent,
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    AbstractActiveControllerComponent,
    AbstractErrorCallbackBehaviorComponent,
    AbstractErrorTransformBehaviorComponent,
    LicensingAbstractComponent,
    TapAbstractBehaviorComponent
  ],
  templateUrl: './references-abstracts.component.html',
  styleUrls: ['../../scss/documentation.scss']
})
export class ReferencesAbstractsLandingPageComponent {
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
