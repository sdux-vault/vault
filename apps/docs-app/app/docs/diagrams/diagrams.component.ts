import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRoutingDirective } from '../pipeline/directives/pipeline-routing.directive';
import { PipelineRelatedTopicComponent } from '../related-topic/related-topic.component';
import { DIAGRAM_LINKS } from './constants/diagrams.constant';
import { DiagramLinkShape } from './shapes/diagram-link.shape';

@Component({
  selector: 'sdux-diagrams-documentation',
  standalone: true,
  imports: [
    DiagramComponent,
    BrandNameComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    FeatureCellBrandNameComponent
  ],
  templateUrl: './diagrams.component.html',
  styleUrls: ['../scss/documentation.scss', './diagrams.component.scss']
})
export class DocsDiagramDocumenationComponent extends PipelineRoutingDirective {
  allLinks: DiagramLinkShape[] = DIAGRAM_LINKS;

  stageBehaviors = this.allLinks
    .filter(
      (link: DiagramLinkShape) =>
        link.type === 'behavior' || link.type === 'controller'
    )
    .slice();

  stageFlows = this.allLinks
    .filter((link: DiagramLinkShape) => link.type === 'flow')
    .slice();

  behaviorLinks = this.allLinks
    .filter((link: DiagramLinkShape) => link.type === 'behavior')
    .slice()
    .sort((a: DiagramLinkShape, b: DiagramLinkShape) =>
      a.sort.localeCompare(b.sort)
    );

  controllerLinks = this.allLinks
    .filter((link: DiagramLinkShape) => link.type === 'controller')
    .slice()
    .sort((a: DiagramLinkShape, b: DiagramLinkShape) =>
      a.sort.localeCompare(b.sort)
    );

  flowLinks = this.allLinks
    .filter((link: DiagramLinkShape) => link.type === 'flow')
    .slice()
    .sort((a: DiagramLinkShape, b: DiagramLinkShape) =>
      a.sort.localeCompare(b.sort)
    );

  testingLinks = this.allLinks
    .filter((link: DiagramLinkShape) => link.type === 'testing')
    .slice()
    .sort((a: DiagramLinkShape, b: DiagramLinkShape) =>
      a.sort.localeCompare(b.sort)
    );
}
