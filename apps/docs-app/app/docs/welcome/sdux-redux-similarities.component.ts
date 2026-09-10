import { Component } from '@angular/core';
import {
  BrandNameComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from '../related-topic/related-topic.component';

@Component({
  selector: 'sdux-top-tier-sdux-redux-similarities',
  standalone: true,
  imports: [
    BrandNameComponent,
    PipelineRelatedTopicComponent,
    SDuXVideoComponent
  ],
  templateUrl: './sdux-redux-similarities.component.html',
  styleUrls: ['../scss/documentation.scss']
})
export class DocsTopTierSDuXReduxSimilaritiesComponent {}
