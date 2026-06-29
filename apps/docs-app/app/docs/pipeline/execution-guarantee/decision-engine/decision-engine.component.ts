import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { DecisionOutcomesCommonComponent } from '../../../common/conductor/decision-outcomes.common.component';
import { PipelineRoutingDirective } from '../../directives/pipeline-routing.directive';

@Component({
  selector: 'sdux-decision-engine',
  standalone: true,
  imports: [
    RouterModule,
    BrandNameComponent,
    DecisionOutcomesCommonComponent,
    DiagramComponent,
    FeatureCellBrandNameComponent,
    PipelineRelatedTopicComponent
  ],
  templateUrl: './decision-engine.component.html',
  styleUrls: ['../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DecisionEngineComponent extends PipelineRoutingDirective {}
