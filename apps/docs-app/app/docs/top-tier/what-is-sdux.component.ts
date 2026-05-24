import { Component } from '@angular/core';
import {
  BrandNameComponent,
  CatchPhraseComponent,
  FeatureCellBrandNameComponent,
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
    FeatureCellBrandNameComponent
  ],
  templateUrl: './what-is-sdux.component.html',
  styleUrls: ['../scss/example.scss']
})
export class DocsTopTierWhatIsSDuXComponent {}
