import { Component } from '@angular/core';
import {
  BrandNameComponent,
  DiagramComponent,
  FeatureCellBrandNameComponent,
  SDuXVideoComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { VaultErrorShapeCommonComponent } from '../common/error/error-shape.component';
import { StateSnapshotShapeCommonComponent } from '../common/state/state-snapshot-shape.component';
import { StateTypeCommonComponent } from '../common/state/state-type.component';
import { PipelineRelatedTopicComponent } from '../related-topic/related-topic.component';

@Component({
  selector: 'sdux-top-tier-core-concepts',
  standalone: true,
  imports: [
    BrandNameComponent,
    DiagramComponent,
    StateSnapshotShapeCommonComponent,
    StateTypeCommonComponent,
    VaultErrorShapeCommonComponent,
    PipelineRelatedTopicComponent,
    VaultBrandNameComponent,
    FeatureCellBrandNameComponent,
    SDuXVideoComponent
  ],
  templateUrl: './core-concepts.component.html',
  styleUrls: ['../scss/example.scss']
})
export class DocsTopTierCoreConceptsComponent {}
