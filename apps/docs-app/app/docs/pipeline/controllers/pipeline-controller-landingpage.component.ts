import { Component, ViewEncapsulation } from '@angular/core';
import { PipelineRoutingDirective } from '../directives/pipeline-routing.directive';
import { PipelineDelayControllerComponent } from './components/delay/delay.pipeline.component';
import { PipelineMaxFailuresControllerComponent } from './components/max-failures/max-failures.pipeline.component';
import { PipelinePolicyComponent } from './components/policy/policy.pipeline.component';
import { PipelineReplayGlobalErrorControllerComponent } from './components/replay-global-error/replay-global-error.pipeline.component';
import { PipelineStepwiseControllerComponent } from './components/stepwise/stepwise.pipeline.component';
import { PipelineTabSyncControllerComponent } from './components/tab-sync/tab-sync.pipeline.component';
import { PipelineWithThrottleControllerComponent } from './components/with-throttle/with-throttle.pipeline.component';
import { PipelineWhatIsAControllerComponent } from './what-is-a-controller/what-is-a-controller.pipeline.component';

@Component({
  selector: 'sdux-pipeline-controller-landingpage',
  standalone: true,
  imports: [
    PipelineReplayGlobalErrorControllerComponent,
    PipelineStepwiseControllerComponent,
    PipelinePolicyComponent,
    PipelineWhatIsAControllerComponent,
    PipelineDelayControllerComponent,
    PipelineTabSyncControllerComponent,
    PipelineWithThrottleControllerComponent,
    PipelineMaxFailuresControllerComponent
  ],
  templateUrl: './pipeline-controller-landingpage.component.html',
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineControllerLandingComponent extends PipelineRoutingDirective {}
