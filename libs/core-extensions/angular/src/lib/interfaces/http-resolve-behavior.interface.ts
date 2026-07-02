import { Injector } from '@angular/core';
import { BehaviorClassContract } from '@sdux-vault/shared';

/**
 * Static-side contract for Angular HTTP resource resolve behavior classes.
 *
 * Extends the standard behavior class contract with a static injector
 * setter required by behaviors that use Angular APIs needing an
 * injection context during pipeline execution.
 */
export interface HttpResolveBehaviorClassContract<
  T = unknown
> extends BehaviorClassContract<T> {
  /**
   * Sets the Angular injector used by all instances during resolve.
   *
   * @param injector - The Angular injector from the provider context.
   */
  setInjector(injector: Injector): void;
}
