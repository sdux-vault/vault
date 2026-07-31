import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { StackblitzLanguageExampleComponent } from '../../../../stack-blitz/example/stackblitz-language-example/stackblitz-language-example.component';
import { ChapterStackBlitzShape } from '../../../shape/chapter-stackblitz.shape';
import { ExampleFileShape } from '../../../shape/example-file.shape';

@Component({
  selector: 'sdux-add-edit-characters-chapter',
  standalone: true,
  imports: [
    RouterModule,
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    StackblitzLanguageExampleComponent
  ],
  templateUrl: './add-edit-characters.chapter.component.html'
})
export class AddEditCharactersChapterComponent {
  readonly componentFiles = input.required<readonly ExampleFileShape[]>();
  readonly serviceFiles = input.required<readonly ExampleFileShape[]>();
  readonly appConfigFile = input.required<ExampleFileShape>();

  readonly stackblitz = input.required<ChapterStackBlitzShape>();
}
