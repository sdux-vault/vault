import { Component } from '@angular/core';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { DevmodeLicensingCommonComponent } from '../../../common/licensing/devmode-licensing.component';
import { PipelineRelatedTopicComponent } from '../../../related-topic/related-topic.component';

@Component({
  selector: 'sdux-what-is-sdux-extensions',
  standalone: true,
  imports: [
    BrandNameComponent,
    ExampleViewerSourceComponent,
    DevmodeLicensingCommonComponent,
    ExampleViewerTabComponent,
    PipelineRelatedTopicComponent
  ],
  templateUrl: './what-is-sdux-extensions.component.html',
  styleUrls: ['../../../scss/documentation.scss']
})
export class PipelineWhatIsSduxExtensionsComponent {}
