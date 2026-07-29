import { inject, Injectable } from '@angular/core';
import {
  AnalyticsService,
  BrandNameService
} from '@sdux-vault/ui/web-components';
import StackBlitz from '@stackblitz/sdk';
import { createExampleGroups } from '../constants/stackblitz-examples.constant';
import { FrameworkIconsConstant } from '../constants/stackblitz-framework-icon.constant';
import { STACKBLITZ_PROJECT_IMPORTS } from '../constants/stackblitz-project-imports.generated';
import type { StackBlitzExampleShape } from '../shapes/stackblitz-example.shape';

@Injectable({ providedIn: 'root' })
export class StackblitzExampleService {
  /**
   * Tracks user interactions with the StackBlitz example launch and copy buttons.
   */
  #analytics: AnalyticsService;
  /**
   * Maps each supported runtime key to its displayed framework icon.
   */
  #frameworkIcons = FrameworkIconsConstant;

  /**
   * The brandName of the site
   */
  readonly #brandName = inject(BrandNameService).value;
  /** The example groups categorized by feature. */
  readonly #exampleGroups = createExampleGroups(this.#brandName);

  /**
   * The constructor
   */
  constructor() {
    this.#analytics = inject(AnalyticsService);
  }

  /**
   *
   * @param id The stackblitz id
   * @returns A StackBlitzExampleShape or undefined if not found
   */
  getExample(id: string): StackBlitzExampleShape | undefined {
    for (const group of this.#exampleGroups) {
      const match = group.examples.find((entry) => entry.id === id);
      if (match) {
        return match;
      }
    }

    return undefined;
  }

  /**
   *
   * @param framework The framework key to look up
   * @returns A string path to the framework icon, or a default icon if not found
   */
  getFrameworkIcon(framework: string): string {
    return (
      this.#frameworkIcons[framework] ??
      'assets/brand/sdux-vault/sdux-symbol.svg'
    );
  }

  /**
   * Copies the repository-backed StackBlitz URL for one framework option.
   * @param example - Registry metadata for the selected example.
   * @param framework - Runtime directory containing the example.
   * @returns A promise that resolves after the link is copied.
   */
  copyStackBlitzExample(
    example: StackBlitzExampleShape,
    framework: string
  ): Promise<string> {
    const url = `https://stackblitz.com/github/sdux-vault/stackblitz-examples/tree/main/stackblitz/${framework}/${example.exampleName}`;
    const key = `${framework}/${example.exampleName}`;

    return navigator.clipboard.writeText(url).then(() => {
      this.#analytics.trackStackblitzInteraction({
        exampleId: example.id,
        framework,
        action: 'copy'
      });
      return key;
    });
  }

  /**
   * Records and launches the selected framework-specific example.
   * @param example - Registry metadata for the selected example.
   * @param framework - Runtime key selected by the user.
   * @returns void
   */
  launchStackblitzExample(
    example: StackBlitzExampleShape,
    framework: string
  ): void {
    this.#analytics.trackStackblitzInteraction({
      exampleId: example.id,
      framework,
      action: 'launch'
    });

    void this.#openStackblitzExample(example, framework);
  }

  /**
   * Loads and opens the generated StackBlitz project for one framework option.
   * @param example - Registry metadata for the selected example.
   * @param framework - Runtime key used by the generated project registry.
   * @returns A promise that resolves after the project is opened.
   * @throws When no generated project exists for the requested key.
   */
  /* istanbul ignore next -- dynamic imports not available in Karma test bundle */
  async #openStackblitzExample(
    example: StackBlitzExampleShape,
    framework: string
  ): Promise<void> {
    const key = `${framework}/${example.exampleName}`;
    const loader =
      STACKBLITZ_PROJECT_IMPORTS[
        key as keyof typeof STACKBLITZ_PROJECT_IMPORTS
      ];

    /* istanbul ignore next -- dynamic imports not available in Karma test bundle */
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
