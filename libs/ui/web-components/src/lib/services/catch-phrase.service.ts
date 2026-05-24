import { Injectable, inject } from '@angular/core';
import { SDUX_CATCH_PHRASE } from '../tokens/catch-phrase.token';

/**
 * Service exposing the application's configured catch phrase for use in
 * tooltips, ARIA labels, and other programmatic UI contexts.
 *
 * Whereas the `<sdux-catch-phrase>` component renders the phrase directly
 * into the DOM, this service provides a lightweight accessor that can be
 * consumed within components, directives, and templates:
 *
 * ```ts
 * tooltip = this.catchPhraseService.phrase;
 * ariaLabel = this.catchPhraseService.phrase;
 * ```
 *
 * The underlying value is supplied by the application through the
 * {@link SDUX_CATCH_PHRASE} injection token. This service performs no
 * transformations and does not cache or mutate the string.
 */
@Injectable({
  providedIn: 'root'
})
export class CatchPhraseService {
  /**
   * The resolved catch phrase string provided by the application through the
   * {@link SDUX_CATCH_PHRASE} token.
   */
  readonly phrase = inject(SDUX_CATCH_PHRASE);

  /**
   * Returns the configured catch phrase.
   *
   * This getter exists to support ergonomic usage in templates and DI contexts.
   */
  get value(): string {
    return this.phrase;
  }
}
