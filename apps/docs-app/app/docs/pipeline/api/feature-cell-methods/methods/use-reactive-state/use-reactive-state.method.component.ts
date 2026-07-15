import { Component, ViewEncapsulation } from '@angular/core';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { StateSnapshotShapeCommonComponent } from 'apps/docs-app/app/docs/common/state/state-snapshot-shape.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * Provides the useReactiveState method documentation.
 */
@Component({
  selector: 'sdux-pipeline-use-reactive-state-method',
  standalone: true,
  imports: [
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    FeatureCellBrandNameComponent,
    PackageNameComponent,
    PipelineRelatedTopicComponent,
    StateSnapshotShapeCommonComponent
  ],
  templateUrl: './use-reactive-state.method.component.html',
  styleUrls: ['../../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineUseReactiveStateMethodComponent {}
