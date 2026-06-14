import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  DiagramComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from '../../../related-topic/related-topic.component';

/**
 * The pipeline how to build an documentation
 */
@Component({
  selector: 'sdux-pipeline-how-to-build-an-addon',
  standalone: true,
  imports: [
    BrandNameComponent,
    DiagramComponent,
    PackageNameComponent,
    PipelineRelatedTopicComponent
  ],
  templateUrl: 'how-to-build-an-addon.pipeline.component.html',
  styleUrls: ['../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineHowToBuildAnAddonComponent {}
