import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VaultFeatureCellShapeCommonComponent } from 'apps/docs-app/app/docs/common/feature-cell/feature-cell-shape.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { FeatureCellDiagramCommonComponent } from '../../../common/feature-cell/feature-cell-diagram.component';

/**
 * The pipeline provide vault documentation
 */
@Component({
  selector: 'sdux-pipeline-feature-cell-api',
  standalone: true,
  imports: [
    RouterModule,
    PipelineRelatedTopicComponent,
    VaultFeatureCellShapeCommonComponent,
    FeatureCellDiagramCommonComponent
  ],
  templateUrl: './feature-cell.api.component.html',
  styleUrls: ['../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineFeatureCellApiComponent {}
