import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  BrandNameService,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { PipelineRoutingDirective } from '../pipeline/directives/pipeline-routing.directive';
import { createExampleGroups } from './constants/stackblitz-examples.constant';
import { createLanguageSections } from './constants/stackblitz-language-sections.constant';
import { StackBlitzExampleComponent } from './example/stack-blitz-example.component';

/**
 * The stack-blitz documentation
 */
@Component({
  selector: 'sdux-stack-blitz-overview',
  standalone: true,
  imports: [
    MatTooltip,
    PipelineRelatedTopicComponent,
    RouterModule,
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    StackBlitzExampleComponent
  ],
  templateUrl: './stack-blitz.component.html',
  styleUrls: ['../scss/documentation.scss', './stack-blitz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StackBlitzOverviewComponent extends PipelineRoutingDirective {
  #brandNameService = inject(BrandNameService);
  #brandName = this.#brandNameService.value;

  readonly frameworkIcons: Record<string, string> = {
    angular: 'assets/brand/angular/angular-icon.png',
    bun: 'assets/brand/bun/bun-icon.svg',
    deno: 'assets/brand/deno/deno-icon.svg',
    nodejs: 'assets/brand/nodejs/nodejs-icon.svg',
    react: 'assets/brand/react/react-icon.svg',
    svelte: 'assets/brand/svelte/svelte-icon.svg',
    typescript: 'assets/brand/typescript/typescript-icon.svg',
    vanillajs: 'assets/brand/vanillajs/vanillajs-icon.svg',
    vue: 'assets/brand/vue/vue-icon.svg'
  };

  readonly exampleGroups = createExampleGroups(this.#brandName);
  readonly languageSections = createLanguageSections(this.#brandName);
}
