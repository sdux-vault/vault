import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { VaultFilterFunctionShapeCommonComponent } from 'apps/docs-app/app/docs/common/filter-function-shape.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline filters method documentation
 */
@Component({
  selector: 'sdux-pipeline-filters-method',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    DiagramComponent,
    VaultFilterFunctionShapeCommonComponent
  ],
  templateUrl: './filters.method.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineFiltersMethodComponent {}
