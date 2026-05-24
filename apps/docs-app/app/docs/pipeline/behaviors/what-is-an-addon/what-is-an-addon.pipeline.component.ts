import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

/**
 * The pipeline what is an addon documentation
 */
@Component({
  selector: 'sdux-pipeline-what-is-an-addon',
  standalone: true,
  imports: [
    BrandNameComponent,
    DiagramComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    PackageNameComponent,
    PackageNameComponent
  ],
  templateUrl: './what-is-an-addon.pipeline.component.html',
  styleUrls: ['../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineWhatIsAnAddonComponent {}
