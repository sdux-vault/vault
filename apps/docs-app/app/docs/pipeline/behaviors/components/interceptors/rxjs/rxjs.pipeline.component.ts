import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { PointAtoBQuoteComponent } from 'apps/docs-app/app/docs/common/quotes/point-a-to-b.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

@Component({
  selector: 'sdux-pipeline-interceptors-rxjs',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    BrandNameComponent,
    PointAtoBQuoteComponent
  ],
  templateUrl: './rxjs.pipeline.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineInterceptorsWithRxJSComponent {}
