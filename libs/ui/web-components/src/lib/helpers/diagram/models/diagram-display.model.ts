/**
 * Data model passed into the diagram dialog component.
 *
 * This payload is injected via Angular Material's `MAT_DIALOG_DATA`
 * token and describes which diagram image to display and how it
 * should be labeled for accessibility.
 *
 * Typical usage:
 * - `image` is the relative image path used by `<sdux-image>`
 * - `tooltip` is optional and used for the image tooltip / alt text
 */
export interface DiagramDisplayDataModel {
  /**
   * Relative or asset-path to the diagram image.
   *
   * Example:
   *  - "diagrams/1.0/1.1-featurecell-lifecycle.svg"
   */
  image: string;

  /**
   * Optional descriptive label used as tooltip and alt text
   * inside the diagram dialog.
   *
   * When omitted, the dialog falls back to a default label such as "Diagram".
   */
  tooltip?: string;
}
