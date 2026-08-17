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

import { AES256BehaviorOptionsComponent } from './aes256behavior-options.component';
import { ArrayByIdMergeOptionsComponent } from './array-by-id-merge-options.component';
import { FromStreamOptionsComponent } from './from-stream-options.component';
import { LookupBehaviorOptionsComponent } from './lookup-behavior-options.component';
import { QueryBehaviorOptionsComponent } from './query-behavior-options.component';
import { StateCacheBehaviorOptionsComponent } from './state-cache-behavior-options.component';
import { StepwiseBehaviorOptionsComponent } from './stepwise-behavior-options.component';
import { WithDelayControllerOptionsComponent } from './with-delay-controller-options.component';
import { WithMaxFailureControllerOptionsComponent } from './with-max-failure-controller-options.component';
import { WithThrottleControllerOptionsComponent } from './with-throttle-controller-options.component';

@Component({
  selector: 'sdux-references-options-splashpage',
  standalone: true,
  imports: [
    NotFoundComponent,
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    AES256BehaviorOptionsComponent,
    ArrayByIdMergeOptionsComponent,
    FromStreamOptionsComponent,
    LookupBehaviorOptionsComponent,
    QueryBehaviorOptionsComponent,
    StateCacheBehaviorOptionsComponent,
    StepwiseBehaviorOptionsComponent,
    WithDelayControllerOptionsComponent,
    WithMaxFailureControllerOptionsComponent,
    WithThrottleControllerOptionsComponent
  ],
  templateUrl: './references-options.component.html',
  styleUrls: ['../../scss/documentation.scss']
})
export class ReferencesOptionsLandingPageComponent {
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
