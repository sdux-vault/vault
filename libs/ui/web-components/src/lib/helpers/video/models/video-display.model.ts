/**
 * Data model passed to the video display dialog via MAT_DIALOG_DATA.
 */
export interface VideoDisplayDataModel {
  /** YouTube video identifier. */
  videoId: string;

  /** Optional start time in seconds for the embedded player. */
  start?: number;

  /** Optional tooltip/title displayed in the dialog header. */
  tooltip?: string;
}
