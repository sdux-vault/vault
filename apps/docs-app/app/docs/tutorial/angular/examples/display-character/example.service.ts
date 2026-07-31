// example.service.ts
import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { StarWarsCharacter } from './star-wars-character.shape';

/**
 * Owns the character collection and exposes domain operations for the tutorial component.
 * The FeatureCell decorator associates this service with a typed state boundary, while
 * `injectVault` provides the reactive state and update methods for that boundary.
 * Create, update, remove, and restore operations all flow through the FeatureCell pipeline.
 * ️**Architectural Boundary:** Components consume this service instead of accessing the
 * FeatureCell directly, keeping state ownership and character rules in one place.
 */
@FeatureCell<readonly StarWarsCharacter[]>('star-wars-character')
@Injectable({ providedIn: 'root' })
export class ExampleService {
  // Teaching point: Minimal Read-Only FeatureCell (ex-002)
  /**
   * Provides the strongly typed FeatureCell API associated with this decorated service.
   * Every collection update passes through this reference before reactive state changes.
   */
  readonly #vault = injectVault<readonly StarWarsCharacter[]>(ExampleService);

  /**
   * Exposes the FeatureCell's Angular signal state for value, loading, error, and presence checks.
   * Consumers can bind to these reactive accessors without subscribing manually.
   */
  readonly state = this.#vault.state;

  /**
   * Captures the first committed collection, then configures and initializes the FeatureCell pipeline.
   */
  constructor() {
    /*
     * `.initialize()` finalizes the pipeline configuration and activates the
     * FeatureCell. Its initial value and subsequent updates now pass through the
     * the entire pipeline before becoming committed immutable, reactive State.
     */
    this.#vault.initialize();
  }
}
