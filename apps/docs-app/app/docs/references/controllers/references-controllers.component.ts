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

import { withDelayControllerComponent } from './with-delay-controller.component';
import { withMaxFailuresControllerComponent } from './with-max-failures-controller.component';
import { withReplayGlobalErrorControllerComponent } from './with-replay-global-error-controller.component';
import { withStepwiseControllerComponent } from './with-stepwise-controller.component';
import { withTabSyncControllerComponent } from './with-tab-sync-controller.component';
import { withThrottleControllerComponent } from './with-throttle-controller.component';

@Component({
  selector: 'sdux-references-controllers-splashpage',
  standalone: true,
  imports: [
    NotFoundComponent,
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    withDelayControllerComponent,
    withMaxFailuresControllerComponent,
    withReplayGlobalErrorControllerComponent,
    withStepwiseControllerComponent,
    withTabSyncControllerComponent,
    withThrottleControllerComponent
  ],
  templateUrl: './references-controllers.component.html',
  styleUrls: ['../../scss/example.scss']
})
export class ReferencesControllersLandingPageComponent {
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
