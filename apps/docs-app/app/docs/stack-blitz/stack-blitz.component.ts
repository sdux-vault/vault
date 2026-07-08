import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
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
  styleUrls: ['../scss/documentation.scss'],
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

  readonly exampleGroups = createExampleGroups(this.#brandName).map(
    (group) => ({
      ...group,
      examples: [...group.examples].sort((a, b) =>
        a.title.localeCompare(b.title)
      )
    })
  );

  copySuccess = signal<string | null>(null);

  copyStackBlitzExample(language: string, example: string) {
    const url = `https://stackblitz.com/github/sdux-vault/stackblitz-examples/tree/main/stackblitz/${language}/${example}`;
    const key = `${language}/${example}`;
    navigator.clipboard.writeText(url);
    this.copySuccess.set(key);
    setTimeout(() => this.copySuccess.set(null), 2000);
  }

  /* istanbul ignore next -- dynamic imports not available in Karma test bundle */
  async openStackBlitzExample(language: string, example: string) {
    const key = `${language}/${example}`;
    const loader = this.#projectImports[key];
    if (!loader) {
      return Promise.reject(new Error(`Unknown project: ${key}`));
    }
    const module = await loader();
    const project = Object.values(
      module as Record<string, unknown>
    )[0] as import('@stackblitz/sdk').Project;
    StackBlitz.openProject(project, {
      openFile: 'src/app/example.component.ts'
    });
  }

  /* istanbul ignore next -- dynamic imports not available in Karma test bundle */
  readonly #projectImports: Record<string, () => Promise<unknown>> = {
    'angular/replace-example': () =>
      import('../../stackblitz/projects/angular/replace-example.project'),
    'react/replace-example': () =>
      import('../../stackblitz/projects/react/replace-example.project'),
    'svelte/replace-example': () =>
      import('../../stackblitz/projects/svelte/replace-example.project'),
    'vue/replace-example': () =>
      import('../../stackblitz/projects/vue/replace-example.project'),

    'angular/promise-example': () =>
      import('../../stackblitz/projects/angular/promise-example.project'),
    'react/promise-example': () =>
      import('../../stackblitz/projects/react/promise-example.project'),
    'svelte/promise-example': () =>
      import('../../stackblitz/projects/svelte/promise-example.project'),
    'vue/promise-example': () =>
      import('../../stackblitz/projects/vue/promise-example.project'),

    'angular/observable-example': () =>
      import('../../stackblitz/projects/angular/observable-example.project'),
    'react/observable-example': () =>
      import('../../stackblitz/projects/react/observable-example.project'),
    'svelte/observable-example': () =>
      import('../../stackblitz/projects/svelte/observable-example.project'),
    'vue/observable-example': () =>
      import('../../stackblitz/projects/vue/observable-example.project'),

    'angular/http-resource-example': () =>
      import('../../stackblitz/projects/angular/http-resource-example.project'),

    'angular/basic-filter-reducer-example': () =>
      import('../../stackblitz/projects/angular/basic-filter-reducer-example.project'),
    'react/basic-filter-reducer-example': () =>
      import('../../stackblitz/projects/react/basic-filter-reducer-example.project'),
    'svelte/basic-filter-reducer-example': () =>
      import('../../stackblitz/projects/svelte/basic-filter-reducer-example.project'),
    'vue/basic-filter-reducer-example': () =>
      import('../../stackblitz/projects/vue/basic-filter-reducer-example.project'),

    'angular/interceptor-delay-example': () =>
      import('../../stackblitz/projects/angular/interceptor-delay-example.project'),
    'react/interceptor-delay-example': () =>
      import('../../stackblitz/projects/react/interceptor-delay-example.project'),
    'svelte/interceptor-delay-example': () =>
      import('../../stackblitz/projects/svelte/interceptor-delay-example.project'),
    'vue/interceptor-delay-example': () =>
      import('../../stackblitz/projects/vue/interceptor-delay-example.project'),

    'angular/debugger-example': () =>
      import('../../stackblitz/projects/angular/debugger-example.project'),
    'react/debugger-example': () =>
      import('../../stackblitz/projects/react/debugger-example.project'),
    'svelte/debugger-example': () =>
      import('../../stackblitz/projects/svelte/debugger-example.project'),
    'vue/debugger-example': () =>
      import('../../stackblitz/projects/vue/debugger-example.project'),

    'angular/tab-sync-example': () =>
      import('../../stackblitz/projects/angular/tab-sync-example.project'),
    'react/tab-sync-example': () =>
      import('../../stackblitz/projects/react/tab-sync-example.project'),
    'svelte/tab-sync-example': () =>
      import('../../stackblitz/projects/svelte/tab-sync-example.project'),
    'vue/tab-sync-example': () =>
      import('../../stackblitz/projects/vue/tab-sync-example.project')
  };
}
