import { Component, ViewEncapsulation } from '@angular/core';
import { PipelineRoutingDirective } from '../directives/pipeline-routing.directive';
import { PipelineBuildingCustomBehaviorsComponent } from './building-custom-behaviors/building-custom-behaviors.component';
import { PipelineBuildingCustomControllersComponent } from './building-custom-controllers/building-custom-controllers.component';
import { PipelineLicensingAndMonetizationComponent } from './licensing-and-monetization/licensing-and-monetization.component';
import { PipelineWhatIsSduxExtensionsComponent } from './what-is-sdux-extensions/what-is-sdux-extensions.component';

@Component({
  selector: 'sdux-pipeline-extensions-landingpage',
  standalone: true,
  imports: [
    PipelineBuildingCustomControllersComponent,
    PipelineBuildingCustomBehaviorsComponent,
    PipelineLicensingAndMonetizationComponent,
    PipelineWhatIsSduxExtensionsComponent
  ],
  templateUrl: './pipeline-extension-landingpage.component.html',
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineExtensionsLandingComponent extends PipelineRoutingDirective {}
