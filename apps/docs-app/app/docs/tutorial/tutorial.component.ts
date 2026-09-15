import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from '../related-topic/related-topic.component';

@Component({
  selector: 'sdux-tutorial-overview',
  standalone: true,
  imports: [
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    RouterModule,
    PipelineRelatedTopicComponent
  ],
  templateUrl: './tutorial.component.html',
  styleUrls: ['../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TutorialOverviewComponent {}
