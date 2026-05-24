import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { StateSnapshotShapeCommonComponent } from 'apps/docs-app/app/docs/common/state/state-snapshot-shape.component';
import { VaultSignalStateRefCommonComponent } from 'apps/docs-app/app/docs/common/vault/vault-signal-state-ref-shape.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline state documentation
 */
@Component({
  selector: 'sdux-pipeline-state-property',
  standalone: true,
  imports: [
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    StateSnapshotShapeCommonComponent,
    VaultSignalStateRefCommonComponent,
    PackageNameComponent
  ],
  templateUrl: './state.property.component.html',
  styleUrls: ['../../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineStatePropertyComponent {}
