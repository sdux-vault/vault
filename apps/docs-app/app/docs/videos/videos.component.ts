import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRoutingDirective } from '../pipeline/directives/pipeline-routing.directive';
import { PipelineRelatedTopicComponent } from '../related-topic/related-topic.component';
import { VIDEO_LINKS } from './constants/videos.constant';
import { VideoLinkShape } from './shapes/video-link.shape';

/**
 * Videos index page that provides a visual overview of all
 * SDuX Vault videos organized by category with a navigable
 * table of contents.
 */
@Component({
  selector: 'sdux-videos-documentation',
  standalone: true,
  imports: [
    SDuXVideoComponent,
    BrandNameComponent,
    RouterModule,
    PipelineRelatedTopicComponent
  ],
  templateUrl: './videos.component.html',
  styleUrls: ['../scss/example.scss', './videos.component.scss']
})
export class DocsVideoDocumentationComponent extends PipelineRoutingDirective {
  /** All video links. */
  allLinks: VideoLinkShape[] = VIDEO_LINKS;

  /** Overview videos sorted alphabetically. */
  overviewLinks = this.allLinks
    .filter((link: VideoLinkShape) => link.type === 'overview')
    .slice()
    .sort((a, b) => a.sort.localeCompare(b.sort));

  /** Stage-specific videos sorted alphabetically. */
  stageLinks = this.allLinks
    .filter((link: VideoLinkShape) => link.type === 'stage')
    .slice()
    .sort((a, b) => a.sort.localeCompare(b.sort));

  /** Testing videos sorted alphabetically. */
  testingLinks = this.allLinks
    .filter((link: VideoLinkShape) => link.type === 'testing')
    .slice()
    .sort((a, b) => a.sort.localeCompare(b.sort));

  /** Integration videos sorted alphabetically. */
  integrationLinks = this.allLinks
    .filter((link: VideoLinkShape) => link.type === 'integration')
    .slice()
    .sort((a, b) => a.sort.localeCompare(b.sort));
}
