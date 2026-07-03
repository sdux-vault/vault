import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MultiFrameworkExampleComponent } from '@sdux-vault/ui/web-components';
import { StateEmitSnapshotShapeCommonComponent } from 'apps/docs-app/app/docs/common/state/state-emit-snapshot-shape.component';
import { StateSnapshotShapeCommonComponent } from 'apps/docs-app/app/docs/common/state/state-snapshot-shape.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline state stream documentation
 */
@Component({
  selector: 'sdux-pipeline-state-stream-method',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    StateEmitSnapshotShapeCommonComponent,
    StateSnapshotShapeCommonComponent
  ],
  templateUrl: './state-stream.method.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineStateStreamMethodComponent {}
