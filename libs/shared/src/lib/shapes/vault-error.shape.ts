/**
 * Canonical error representation emitted by the Vault pipeline.
 *
 * `VaultError` normalizes thrown values from any pipeline stage into a
 * consistent shape that addon error behaviors can transform and that
 * consumers can observe from the global VaultErrorPublicService signal.
 */
export interface VaultErrorShape {
  /**
   * Human-readable error message.
   */
  message: string;

  /**
   * Optional FeatureCell key.
   */
  featureCellKey: string;

  /**
   * Timestamp (epoch ms) when the error occurred.
   * Enables reactive timelines and differentiating repeated errors.
   */
  timestamp: number;

  /**
   * Raw thrown value captured before any normalization.
   * Useful for debugging, logging, and devtools visualization.
   */
  raw: unknown;

  /**
   * Optional numeric status (HTTP or domain).
   */
  status?: number;

  /**
   * Optional textual status text (e.g., HTTP status text).
   */
  statusText?: string;

  /**
   * Additional diagnostic or domain-specific details.
   */
  details?: unknown;
}
