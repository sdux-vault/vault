import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';
import { PipelineRoutingDirective } from 'apps/docs-app/app/docs/pipeline/directives/pipeline-routing.directive';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The sdux-training documentation
 */
@Component({
  selector: 'sdux-training-overview',
  standalone: true,
  imports: [PipelineRelatedTopicComponent, RouterModule, BrandNameComponent],
  templateUrl: './sdux-training.component.html',
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SDuXTrainingOverviewComponent extends PipelineRoutingDirective {}
