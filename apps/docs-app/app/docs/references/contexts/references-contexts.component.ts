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

import { BehaviorClassContextComponent } from './behavior-class-context.component';
import { BehaviorContextComponent } from './behavior-context.component';
import { ControllerClassContextComponent } from './controller-class-context.component';
import { ControllerContextComponent } from './controller-context.component';
import { FeatureCellExtensionContextComponent } from './feature-cell-extension-context.component';
import { LicensableClassContextComponent } from './licensable-class-context.component';
import { TabSyncBehaviorClassContextComponent } from './tab-sync-behavior-class-context.component';

@Component({
  selector: 'sdux-references-contexts-splashpage',
  standalone: true,
  imports: [
    NotFoundComponent,
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    BehaviorClassContextComponent,
    BehaviorContextComponent,
    ControllerClassContextComponent,
    ControllerContextComponent,
    FeatureCellExtensionContextComponent,
    LicensableClassContextComponent,
    TabSyncBehaviorClassContextComponent
  ],
  templateUrl: './references-contexts.component.html',
  styleUrls: ['../../scss/example.scss']
})
export class ReferencesContextsLandingPageComponent {
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
