import { Component, computed, inject, input } from '@angular/core';
import { StackblitzExampleService } from '../services/stackblitz-example.service';
import type { StackBlitzExampleShape } from '../shapes/stackblitz-example.shape';
import { StackblitzLanguageExampleComponent } from './stackblitz-language-example/stackblitz-language-example.component';

/**
 * Renders the launch, share, and notice controls for one StackBlitz example.
 */
@Component({
  selector: 'sdux-stackblitz-example',
  standalone: true,
  imports: [StackblitzLanguageExampleComponent],
  templateUrl: './stackblitz-example.component.html'
})
export class StackBlitzExampleComponent {
  readonly #stackBlitzService = inject(StackblitzExampleService);

  /** Provides example metadata directly when the caller already has the entry. */
  readonly example = input<StackBlitzExampleShape>();

  /** Identifies an example to resolve from the framework example constants. */
  readonly id = input<string>();

  /**
   * Selects the directly supplied example or resolves the requested example ID.
   * Direct metadata takes precedence when both inputs are present.
   */
  readonly resolvedExample = computed<StackBlitzExampleShape | undefined>(
    () => {
      const example = this.example();
      if (example) {
        return example;
      }

      const id = this.id();
      if (!id) {
        return undefined;
      }

      return this.#stackBlitzService.getExample(id);
    }
  );
}
