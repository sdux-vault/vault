import { Component, computed, inject, input, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import {
  AnalyticsService,
  BrandNameService
} from '@sdux-vault/ui/web-components';
import StackBlitz from '@stackblitz/sdk';
import { createExampleGroups } from '../constants/stackblitz-examples.constant';
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
  readonly #analytics = inject(AnalyticsService);
  readonly #brandName = inject(BrandNameService).value;
  readonly #exampleGroups = createExampleGroups(this.#brandName);

  /** Provides example metadata directly when the caller already has the entry. */
  readonly example = input<StackBlitzExampleShape>();

  /** Identifies an example to resolve from the framework example constants. */
  readonly id = input<string>();

  /**
   * Selects the directly supplied example or resolves the requested example ID.
   * Direct metadata takes precedence when both inputs are present.
   */
  readonly resolvedExample = computed(() => {
    const example = this.example();
    if (example) {
      return example;
    }

    const id = this.id();
    if (!id) {
      return undefined;
    }

    for (const group of this.#exampleGroups) {
      const match = group.examples.find((entry) => entry.id === id);
      if (match) {
        return match;
      }
    }

    return undefined;
  });

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
   * @param example - Registry metadata for the selected example.
   * @param framework - Runtime directory containing the example.
   * @returns A promise that resolves after the link is copied.
   */
  copyStackBlitzExample(
    example: StackBlitzExampleShape,
    framework: string
  ): Promise<void> {
    const url = `https://stackblitz.com/github/sdux-vault/stackblitz-examples/tree/main/stackblitz/${framework}/${example.exampleName}`;
    const key = `${framework}/${example.exampleName}`;

    return navigator.clipboard.writeText(url).then(() => {
      this.#analytics.trackStackBlitzInteraction({
        exampleId: example.id,
        framework,
        action: 'copy'
      });
      this.#snackBar.open('Link copied!', '', {
        duration: 2000,
        verticalPosition: 'top'
      });
      this.copySuccess.set(key);
      setTimeout(() => this.copySuccess.set(null), 2000);
    });
  }

  /**
   * Records and launches the selected framework-specific example.
   * @param example - Registry metadata for the selected example.
   * @param framework - Runtime key selected by the user.
   * @returns void
   */
  launchStackBlitzExample(
    example: StackBlitzExampleShape,
    framework: string
  ): void {
    this.#analytics.trackStackBlitzInteraction({
      exampleId: example.id,
      framework,
      action: 'launch'
    });

    void this.openStackBlitzExample(example, framework);
  }

  /**
   * Loads and opens the generated StackBlitz project for one framework option.
   * @param example - Registry metadata for the selected example.
   * @param framework - Runtime key used by the generated project registry.
   * @returns A promise that resolves after the project is opened.
   * @throws When no generated project exists for the requested key.
   */
  /* istanbul ignore next -- dynamic imports not available in Karma test bundle */
  async openStackBlitzExample(
    example: StackBlitzExampleShape,
    framework: string
  ): Promise<void> {
    const key = `${framework}/${example.exampleName}`;
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
