import { Component, inject, input, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import StackBlitz from '@stackblitz/sdk';
import { STACKBLITZ_PROJECT_IMPORTS } from '../constants/stackblitz-project-imports.generated';
import type { StackBlitzExampleShape } from '../shapes/stackblitz-example.shape';

/**
 * Renders the launch, share, and notice controls for one StackBlitz example.
 */
@Component({
  selector: 'sdux-stack-blitz-example',
  standalone: true,
  imports: [MatIcon, MatTooltip],
  templateUrl: './stack-blitz-example.component.html'
})
export class StackBlitzExampleComponent {
  readonly #snackBar = inject(MatSnackBar);

  /** Provides the example metadata rendered by this component. */
  readonly example = input.required<StackBlitzExampleShape>();

  /** Maps each supported runtime key to its displayed framework icon. */
  readonly frameworkIcons: Record<string, string> = {
    angular: 'assets/brand/angular/angular-icon.png',
    bun: 'assets/brand/bun/bun-icon.svg',
    nodejs: 'assets/brand/nodejs/nodejs-icon.svg',
    react: 'assets/brand/react/react-icon.svg',
    svelte: 'assets/brand/svelte/svelte-icon.svg',
    vanillajs: 'assets/brand/vanillajs/vanillajs-icon.svg',
    vue: 'assets/brand/vue/vue-icon.svg'
  };

  /** Identifies the language and example whose share link was copied. */
  readonly copySuccess = signal<string | null>(null);

  /**
   * Copies the repository-backed StackBlitz URL for one framework option.
   * @param language - Runtime directory containing the example.
   * @param exampleName - Example directory used to build the URL.
   * @returns void
   */
  copyStackBlitzExample(language: string, exampleName: string): void {
    const url = `https://stackblitz.com/github/sdux-vault/stackblitz-examples/tree/main/stackblitz/${language}/${exampleName}`;
    const key = `${language}/${exampleName}`;

    navigator.clipboard.writeText(url).then(() => {
      this.#snackBar.open('Link copied!', '', {
        duration: 2000,
        verticalPosition: 'top'
      });
    });
    this.copySuccess.set(key);
    setTimeout(() => this.copySuccess.set(null), 2000);
  }

  /**
   * Loads and opens the generated StackBlitz project for one framework option.
   * @param language - Runtime key used by the generated project registry.
   * @param exampleName - Example name used by the generated project registry.
   * @returns A promise that resolves after the project is opened.
   * @throws When no generated project exists for the requested key.
   */
  /* istanbul ignore next -- dynamic imports not available in Karma test bundle */
  async openStackBlitzExample(
    language: string,
    exampleName: string
  ): Promise<void> {
    const key = `${language}/${exampleName}`;
    const loader =
      STACKBLITZ_PROJECT_IMPORTS[
        key as keyof typeof STACKBLITZ_PROJECT_IMPORTS
      ];

    if (!loader) {
      throw new Error(`Unknown project: ${key}`);
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
