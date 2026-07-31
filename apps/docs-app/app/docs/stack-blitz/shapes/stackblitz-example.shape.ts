import { StackBlitzExampleLanguageShape } from './stackblitz-example.language.shape';

/**
 * Defines the metadata used to configure a StackBlitz example.
 */
export interface StackBlitzExampleShape {
  /**
   * Provides the display title for the example.
   */
  title: string;

  /**
   * Provides the identifier used to reference the example.
   */
  id: string;

  /**
   * Provides the name used to locate the example source.
   */
  exampleName: string;

  /**
   * Provides the description displayed for the example.
   */
  description: string;

  /**
   * Provides the language options available for the example.
   */
  languages: StackBlitzExampleLanguageShape[];

  /**
   * Indicates whether the example uses Vault.
   */
  isVault?: boolean;

  /**
   * Provides an optional notice displayed with the example.
   */
  notice?: string;

  /**
   * Indicates whether the example is local-only and not viable via StackBlitz.
   */
  localOnly?: boolean;

  /**
   * Indicates whether the example should have the copy icon displayed.
   */
  displayCopyIcon: boolean;
}
