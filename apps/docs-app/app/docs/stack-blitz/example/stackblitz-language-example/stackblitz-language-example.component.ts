import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  input,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { StackblitzExampleService } from '../../services/stackblitz-example.service';
import { StackBlitzExampleLanguageShape } from '../../shapes/stackblitz-example.language.shape';
import type { StackBlitzExampleShape } from '../../shapes/stackblitz-example.shape';

/**
 * Renders the launch, share, and notice controls for one StackBlitz example.
 */
@Component({
  selector: 'sdux-stackblitz-language-example',
  standalone: true,
  imports: [MatIcon, MatTooltip, CommonModule],
  templateUrl: './stackblitz-language-example.component.html',
  styleUrls: ['../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StackblitzLanguageExampleComponent {
  readonly #snackBar = inject(MatSnackBar);

  readonly #stackBlitzService = inject(StackblitzExampleService);

  /** Provides example metadata directly when the caller already has the entry. */
  readonly example = input.required<StackBlitzExampleShape>();

  readonly lang = input.required<StackBlitzExampleLanguageShape>();

  getFrameworkIcon(framework: string): string {
    return this.#stackBlitzService.getFrameworkIcon(framework);
  }

  /** Identifies the language and example whose share link was copied. */
  readonly copySuccess = signal<string | null>(null);

  /**
   * Copies the repository-backed StackBlitz URL for one framework option.
   * @param example - Registry metadata for the selected example.
  async  * @param framework - Runtime directory containing the example.
   * @returns A promise that resolves after the link is copied.
   */
  async copyStackBlitzExample(
    example: StackBlitzExampleShape,
    framework: string
  ): Promise<void> {
    await this.#stackBlitzService
      .copyStackBlitzExample(example, framework)
      .then((key: string) => {
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
  launchStackblitzExample(
    example: StackBlitzExampleShape,
    framework: string
  ): void {
    this.#stackBlitzService.launchStackblitzExample(example, framework);
  }
}
