/** Shape summarizing license validation states across registered FeatureCells. */
export interface DebugWidgetLicenseSummaryShape {
  /** Number of FeatureCells with a valid license. */
  valid: number;
  /** Number of FeatureCells with a pending license check. */
  pending: number;
  /** Number of FeatureCells with a revoked license. */
  revoked: number;
  /** Number of FeatureCells that timed out during license verification. */
  timeout: number;
  /** Number of FeatureCells that do not require a license. */
  notRequired: number;
}
