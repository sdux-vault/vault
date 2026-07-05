import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  MultiFrameworkExampleComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from '../../../related-topic/related-topic.component';

/**
 * The pipeline what is an addon documentation
 */
@Component({
  selector: 'sdux-pipeline-what-is-an-addon',
  standalone: true,
  imports: [
    BrandNameComponent,
    DiagramComponent,
    MultiFrameworkExampleComponent,
    RouterModule,
    PackageNameComponent,
    PipelineRelatedTopicComponent
  ],
  templateUrl: './what-is-an-addon.pipeline.component.html',
  styleUrls: ['../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineWhatIsAnAddonComponent {}
