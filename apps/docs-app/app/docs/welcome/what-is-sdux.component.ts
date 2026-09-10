import { Component } from '@angular/core';
import {
  BrandNameComponent,
  CatchPhraseComponent,
  DiagramComponent,
  FeatureCellBrandNameComponent,
  SDuXVideoComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { NothingHappenedQuoteComponent } from '../common/quotes/nothing-happened.component';
import { PipelineRelatedTopicComponent } from '../related-topic/related-topic.component';

@Component({
  selector: 'sdux-top-tier-what-is-sdux',
  standalone: true,
  imports: [
    BrandNameComponent,
    NothingHappenedQuoteComponent,
    PipelineRelatedTopicComponent,
    CatchPhraseComponent,
    VaultBrandNameComponent,
    FeatureCellBrandNameComponent,
    SDuXVideoComponent,
    DiagramComponent
  ],
  templateUrl: './what-is-sdux.component.html',
  styleUrls: ['../scss/documentation.scss']
})
export class DocsTopTierWhatIsSDuXComponent {}
