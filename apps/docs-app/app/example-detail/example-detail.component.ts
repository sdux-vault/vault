import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BrandNameService } from '@sdux-vault/ui/web-components';
import StackBlitz from '@stackblitz/sdk';
import { PipelineRelatedTopicComponent } from '../docs/related-topic/related-topic.component';
import { createExampleGroups } from '../docs/stack-blitz/constants/stackblitz-examples.constants';
import { STACKBLITZ_PROJECT_IMPORTS } from '../docs/stack-blitz/constants/stackblitz-project-imports.generated';

/**
 * Detail page for a single StackBlitz example scoped to one framework.
 *
 * Route: /examples/:language/:id
 *
 * Looks up the example from createExampleGroups() by id and validates
 * that the requested language is available. Displays the example
 * description, a launch button, a share-link button, and cross-links
 * to the same example in other frameworks.
 */
@Component({
  selector: 'sdux-example-detail',
  standalone: true,
  imports: [RouterLink, MatIcon, MatTooltip, PipelineRelatedTopicComponent],
  templateUrl: './example-detail.component.html',
  styleUrls: [
    './example-detail.component.scss',
    '../docs/scss/documentation.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ExampleDetailComponent {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #brandNameService = inject(BrandNameService);
  #brandName = this.#brandNameService.value;

  readonly frameworkIcons: Record<string, string> = {
    angular: 'assets/brand/angular/angular-icon.svg',
    react: 'assets/brand/react/react-icon.svg',
    svelte: 'assets/brand/svelte/svelte-icon.svg',
    vue: 'assets/brand/vue/vue-icon.svg'
  };

  readonly language = signal('');
  readonly exampleId = signal('');
  readonly example = signal<{
    title: string;
    id: string;
    exampleName: string;
    description: string;
    languages: { name: string; key: string }[];
    isVault?: boolean;
    notice?: string;
  } | null>(null);
  readonly group = signal<{ heading: string; id: string } | null>(null);
  readonly notFound = signal(false);
  readonly copySuccess = signal(false);

  constructor() {
    this.#route.paramMap.subscribe((params) => {
      const language = params.get('language') ?? '';
      const id = params.get('id') ?? '';
      this.language.set(language);
      this.exampleId.set(id);
      this.#resolveExample(language, id);
    });
  }

  #resolveExample(language: string, id: string): void {
    const groups = createExampleGroups(this.#brandName);

    for (const grp of groups) {
      for (const ex of grp.examples) {
        if (ex.id === id) {
          const hasLanguage = (
            ex as { languages: { key: string }[] }
          ).languages.some((l: { key: string }) => l.key === language);
          if (hasLanguage) {
            this.example.set(
              ex as typeof this.example extends () => infer T ? T : never
            );
            this.group.set({ heading: grp.heading, id: grp.id });
            this.notFound.set(false);
            return;
          }
        }
      }
    }

    this.notFound.set(true);
  }

  /* istanbul ignore next -- dynamic imports not available in Karma test bundle */
  async openStackBlitzExample(): Promise<void> {
    const ex = this.example();
    const lang = this.language();
    if (!ex) return;

    const key = `${lang}/${ex.exampleName}`;
    const loader = STACKBLITZ_PROJECT_IMPORTS[key];
    if (!loader) return;

    const module = await loader();
    const project = Object.values(
      module as Record<string, unknown>
    )[0] as import('@stackblitz/sdk').Project;
    StackBlitz.openProject(project, {
      openFile: 'src/app/example.component.ts'
    });
  }

  copyStackBlitzLink(): void {
    const ex = this.example();
    const lang = this.language();
    if (!ex) return;

    const url = `https://stackblitz.com/github/sdux-vault/stackblitz-examples/tree/main/stackblitz/${lang}/${ex.exampleName}`;
    navigator.clipboard.writeText(url);
    this.copySuccess.set(true);
    setTimeout(() => this.copySuccess.set(false), 2000);
  }

  otherLanguages(): { name: string; key: string }[] {
    const ex = this.example();
    const lang = this.language();
    if (!ex) return [];
    return ex.languages.filter((l) => l.key !== lang);
  }

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
