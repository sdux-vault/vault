import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { DevmodeLicensingCommonComponent } from '../../../common/licensing/devmode-licensing.component';
import { PipelineRoutingDirective } from '../../directives/pipeline-routing.directive';

@Component({
  selector: 'sdux-licensing-and-monetization',
  standalone: true,
  imports: [
    DiagramComponent,
    BrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    DevmodeLicensingCommonComponent
  ],
  templateUrl: './licensing-and-monetization.component.html',
  styleUrls: ['../../../scss/example.scss']
})
export class PipelineLicensingAndMonetizationComponent extends PipelineRoutingDirective {}
