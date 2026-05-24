/** Configuration options for the withMaxFailures controller. */
export interface WithMaxFailureControllerOptions {
  /** Maximum number of consecutive failures before the pipeline halts. */
  maxFailures: number;
}
