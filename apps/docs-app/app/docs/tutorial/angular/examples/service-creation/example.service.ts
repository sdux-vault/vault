// example.service.ts
import { Injectable } from '@angular/core';

/**
 * Establishes the Angular service that will own Star Wars character use cases.
 * At this stage it remains a conventional root-provided injectable with no
 * SDuX APIs, demonstrating that the domain service can be designed independently
 * of its State framework integration. Later tutorial steps connect this same
 * service to its registered FeatureCell.
 */
@Injectable({ providedIn: 'root' })
export class ExampleService {
  /** Creates the initially empty service before Feature behavior is introduced. */
  constructor() {}
}
