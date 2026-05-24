import { Component } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from '../related-topic/related-topic.component';

@Component({
  selector: 'sdux-top-tier-sdux-redux-similarities',
  standalone: true,
  imports: [BrandNameComponent, PipelineRelatedTopicComponent],
  templateUrl: './sdux-redux-similarities.component.html',
  styleUrls: ['../scss/example.scss']
})
export class DocsTopTierSDuXReduxSimilaritiesComponent {}
