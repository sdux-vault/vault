import { Component } from '@angular/core';
import {
  BrandNameComponent,
  DiagramComponent,
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { FeatureCellConfigCommonComponent } from '../common/feature-cell/feature-cell-config.component';
import { StateSnapshotShapeCommonComponent } from '../common/state/state-snapshot-shape.component';
import { StateTypeCommonComponent } from '../common/state/state-type.component';
import { VaultConfigCommonComponent } from '../common/vault/vault-config.component';
import { PipelineRelatedTopicComponent } from '../related-topic/related-topic.component';

@Component({
  selector: 'sdux-top-tier-how-to-define-your-state',
  standalone: true,
  imports: [
    DiagramComponent,
    BrandNameComponent,
    StateTypeCommonComponent,
    StateSnapshotShapeCommonComponent,
    VaultConfigCommonComponent,
    FeatureCellConfigCommonComponent,
    FeatureCellBrandNameComponent,
    VaultBrandNameComponent,
    MultiFrameworkExampleComponent,
    PipelineRelatedTopicComponent
  ],
  templateUrl: './how-to-define-your-state.component.html',
  styleUrls: ['../scss/documentation.scss']
})
export class DocsTopTierHowToDefineYourStateComponent {}
