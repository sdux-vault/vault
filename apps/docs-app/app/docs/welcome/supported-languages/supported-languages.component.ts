import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    CatchPhraseComponent,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './supported-languages.component.html',
  styleUrls: [
    '../../scss/documentation.scss',
    './supported-languages.component.scss'
  ]
})
export class DocsTopTierSupportedLanguagesComponent {}
