import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from '../../related-topic/related-topic.component';

@Component({
  selector: 'sdux-dev-tools-chrome-extension',
  standalone: true,
  imports: [
    PipelineRelatedTopicComponent,
    BrandNameComponent,
    RouterModule,
    MultiFrameworkExampleComponent,
    FeatureCellBrandNameComponent,
    VaultBrandNameComponent
  ],
  templateUrl: './chrome-extension.component.html',
  styleUrls: ['../../scss/example.scss']
})
export class SDuXDevToolsChromeExtensionComponent {}
