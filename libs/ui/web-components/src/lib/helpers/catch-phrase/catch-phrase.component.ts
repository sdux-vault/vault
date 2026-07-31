import { Component, inject, input } from '@angular/core';
import { SDUX_CATCH_PHRASE } from '../../tokens/catch-phrase.token';

/**
 * Displays the application's configured catch phrase using the SDUX_CATCH_PHRASE
 * injection token.
 */
@Component({
  selector: 'sdux-catch-phrase',
  standalone: true,
  template: `
    @if (tm()) {
      <span class="catch-phrase">
        {{ phrase }}<span class="trademark" aria-hidden="true">&trade;</span>
      </span>
    } @else {
      <span class="catch-phrase">{{ phrase }}</span>
    }
  `,
  styles: `
    @use 'global' as global;
    .catch-phrase {
      color: inherit;
      font-size: inherit;
      display: inline;
      font-weight: inherit;
    }
  `
})
export class CatchPhraseComponent {
  /**
   * Resolved catch phrase string injected from the SDUX_CATCH_PHRASE token.
   */
  readonly phrase = inject(SDUX_CATCH_PHRASE);

  /**
   * Whether to display the trademark symbol after the catch phrase.
   */
  readonly tm = input<boolean>(false);
}
