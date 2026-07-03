import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  CatchPhraseComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from '../../related-topic/related-topic.component';

@Component({
  selector: 'sdux-top-tier-supported-languages',
  standalone: true,
  imports: [
    PipelineRelatedTopicComponent,
    BrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    MatTabsModule,
    CatchPhraseComponent
  ],
  templateUrl: './supported-languages.component.html',
  styleUrls: ['../../scss/documentation.scss']
})
export class DocsTopTierSupportedLanguagesComponent {}
