import { StackBlitzLanguageExampleShape } from './stackblitz-language-example.shape';

/**
 * Defines the metadata used to configure a specialty-runtime section.
 */
export interface StackBlitzLanguageSectionShape {
  /** Provides the heading displayed for the section. */
  heading: string;

  /** Provides the identifier used to reference the section. */
  id: string;

  /** Provides the icon displayed for the section. */
  icon: string;

  /** Provides the description displayed for the section. */
  description: string;

  /** Provides the specialty-runtime examples included in the section. */
  examples: StackBlitzLanguageExampleShape[];
}
