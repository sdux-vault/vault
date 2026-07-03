import { Component, ViewEncapsulation } from '@angular/core';
import {
  DiagramComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-feature-cell-diagram-common',
  imports: [SDuXVideoComponent, DiagramComponent],
  standalone: true,
  template: `
    <section class="diagram-section">
      <div class="section-title">Diagrams & Videos</div>

      <div class="section-body">
        <sdux-video
          videoId="-wTfiJaN9iU"
          [tooltip]="'FeatureCell Definition'" />

        <sdux-diagram
          image="diagrams/1.0/1.1-featurecell-lifecycle.svg"
          [tooltip]="'FeatureCell Lifecycle'"></sdux-diagram>

        <sdux-diagram
          image="diagrams/2.2/2.2.1-pipeline-initialization-flow.svg"
          [tooltip]="'FeatureCell Initialization Flow'">
        </sdux-diagram>
        <sdux-diagram
          image="diagrams/2.2/2.2-full-pipeline-flow.svg"
          [tooltip]="'Full Pipeline Flow'" />
      </div>
    </section>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeatureCellDiagramCommonComponent {}
