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

  readonly exampleGroups = [
    {
      heading: 'Getting Started',
      id: 'getting-started',
      description:
        'Core pipeline concepts — filters, reducers, and FeatureCell state. Start here to understand how data flows through the pipeline.',
      examples: [
        {
          title: 'Replace State',
          id: 'replace-state',
          exampleName: 'replace-example',
          description: `Demonstrates replaceState — the simplest way to update a FeatureCell. The entire previous state is discarded and replaced with the new value in a single atomic operation. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        }
      ]
    },
    {
      heading: 'Intermediate',
      id: 'intermediate',
      description:
        'Pipeline controllers and interceptors — add timing, throttling, and orchestration to your state transitions.',
      examples: [
        {
          title: 'Filter & Reducer Pipeline',
          id: 'basic-filter-reducer',
          exampleName: 'basic-filter-reducer-example',
          description: `Demonstrates how ${this.#brandName} processes state through a pipeline: input data flows through filters and reducers before becoming the final FeatureCell state. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        },
        {
          title: 'Delay Interceptor Pipeline',
          id: 'interceptor-delay',
          exampleName: 'interceptor-delay-example',
          description: `Demonstrates how ${this.#brandName} processes state through a pipeline: input data flows through a delay interceptor before becoming the final FeatureCell state. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        }
      ]
    },
    {
      heading: 'Advanced',
      id: 'advanced',
      description:
        'Developer tooling and diagnostics — record pipeline traces, export debug logs, and generate AI-powered diagnostic reports.',
      examples: [
        {
          title: 'Built-in Debugger',
          id: 'debugger',
          exampleName: 'debugger-example',
          description: `Demonstrates the ${this.#brandName} built-in debugger — a floating panel that captures pipeline execution traces. Record a session, trigger state changes, then export logs or generate an AI diagnostic report. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        },
        {
          title: 'Tab Sync',
          id: 'tab-sync',
          exampleName: 'tab-sync-example',
          isVault: true,
          description: `Demonstrates cross-tab state synchronization using the Tab Sync behavior and controller. State changes committed in one browser tab are automatically broadcast to all other tabs via BroadcastChannel. Open the example in two tabs to see state synchronize in real time. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        }
      ]
    }
  ];

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
