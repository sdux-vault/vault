import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  MultiFrameworkExampleComponent,
  PackageNameComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { StateInputTypeCommonComponent } from 'apps/docs-app/app/docs/common/state/state-input-type.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline merge-state method documentation
 */
@Component({
  selector: 'sdux-pipeline-merge-state-method',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    DiagramComponent,
    VaultBrandNameComponent,
    PackageNameComponent,
    StateInputTypeCommonComponent,
    VaultBrandNameComponent
  ],
  templateUrl: './merge-state.method.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineMergeStateMethodComponent {}
