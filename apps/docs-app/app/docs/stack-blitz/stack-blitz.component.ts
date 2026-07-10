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
import { createLanguageSections } from './constants/stackblitz-language-sections.constants';
import { STACKBLITZ_PROJECT_IMPORTS } from './constants/stackblitz-project-imports.generated';

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
    bun: 'assets/brand/bun/bun-icon.svg',
    react: 'assets/brand/react/react-icon.svg',
    svelte: 'assets/brand/svelte/svelte-icon.svg',
    vue: 'assets/brand/vue/vue-icon.svg'
  };

  readonly exampleGroups = createExampleGroups(this.#brandName);
  readonly languageSections = createLanguageSections(this.#brandName);

  copySuccess = signal<string | null>(null);

  /**
   * Finds an example by id within the example groups and returns its exampleName.
   */
  private findExampleName(exampleId: string): string | null {
    for (const group of this.exampleGroups) {
      const example = group.examples.find((ex) => ex.id === exampleId);
      if (example) {
        return example.exampleName;
      }
    }
    for (const section of this.languageSections) {
      const example = section.examples.find((ex) => ex.id === exampleId);
      if (example) {
        return example.exampleName;
      }
    }
    return null;
  }

  copyStackBlitzExample(language: string, example: string) {
    const exampleName = this.findExampleName(example);
    if (!exampleName) {
      return;
    }
    const url = `https://stackblitz.com/github/sdux-vault/stackblitz-examples/tree/main/stackblitz/${language}/${exampleName}`;
    const key = `${language}/${example}`;
    navigator.clipboard.writeText(url);
    this.copySuccess.set(key);
    setTimeout(() => this.copySuccess.set(null), 2000);
  }

  /* istanbul ignore next -- dynamic imports not available in Karma test bundle */
  async openStackBlitzExample(language: string, example: string) {
    const exampleName = this.findExampleName(example);
    if (!exampleName) {
      return Promise.reject(
        new Error(`Unknown project: ${language}/${example}`)
      );
    }
    const key = `${language}/${exampleName}`;
    const loader =
      STACKBLITZ_PROJECT_IMPORTS[
        key as keyof typeof STACKBLITZ_PROJECT_IMPORTS
      ];
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
}
