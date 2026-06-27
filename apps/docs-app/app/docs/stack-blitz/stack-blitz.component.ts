import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  BrandNameService,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import StackBlitz from '@stackblitz/sdk';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { PipelineRoutingDirective } from '../pipeline/directives/pipeline-routing.directive';
import { createExampleGroups } from './constants/stackblitz-examples.constants';

/**
 * The stack-blitz documentation
 */
@Component({
  selector: 'sdux-stack-blitz-overview',
  standalone: true,
  imports: [
    MatIcon,
    MatTooltip,
    PipelineRelatedTopicComponent,
    RouterModule,
    BrandNameComponent,
    FeatureCellBrandNameComponent
  ],
  templateUrl: './stack-blitz.component.html',
  styleUrls: ['../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StackBlitzOverviewComponent extends PipelineRoutingDirective {
  #brandNameService = inject(BrandNameService);
  #brandName = this.#brandNameService.value;

  readonly frameworkIcons: Record<string, string> = {
    angular: 'assets/brand/angular/angular-icon.svg',
    react: 'assets/brand/react/react-icon.svg',
    svelte: 'assets/brand/svelte/svelte-icon.svg',
    vue: 'assets/brand/vue/vue-icon.svg'
  };

  readonly exampleGroups = createExampleGroups(this.#brandName);

  /* istanbul ignore next -- dynamic imports not available in Karma test bundle */
  openStackBlitzExample(language: string, example: string) {
    const repoSlug = `sdux-vault/stackblitz-examples/tree/main/stackblitz/${language}/${example}`;
    StackBlitz.openGithubProject(repoSlug, {
      openFile: 'src/app/example.component.ts'
    });
  }
}
