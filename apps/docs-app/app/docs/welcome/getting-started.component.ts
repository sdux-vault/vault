import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  CatchPhraseComponent,
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  GenericTabComponent,
  MultiFrameworkExampleComponent,
  PackageNameComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';
import { NothingHappenedQuoteComponent } from '../common/quotes/nothing-happened.component';
import { PipelineRelatedTopicComponent } from '../related-topic/related-topic.component';

@Component({
  selector: 'sdux-top-tier-getting-started',
  standalone: true,
  imports: [
    DiagramComponent,
    ExampleViewerTabComponent,
    ExampleViewerSourceComponent,
    CatchPhraseComponent,
    RouterModule,
    BrandNameComponent,
    MultiFrameworkExampleComponent,
    GenericTabComponent,
    PipelineRelatedTopicComponent,
    NothingHappenedQuoteComponent,
    FeatureCellBrandNameComponent,
    PackageNameComponent,
    SDuXVideoComponent
  ],
  templateUrl: './getting-started.component.html',
  styleUrls: ['../scss/documentation.scss']
})
export class DocsTopTierGettingStartedComponent {}
