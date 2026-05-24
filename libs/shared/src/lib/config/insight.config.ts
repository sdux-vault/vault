/**
 * Defines configuration options that control which data is included in emitted insight events.
 * This interface allows consumers to specify the level of state, payload, error, and queue detail captured during monitoring.
 */
export interface InsightConfig {
  /**
   * Unique identifier for the insight definition.
   * Commonly used to distinguish different monitoring consumers.
   */
  id?: string;

  /**
   * Whether lifecycle events should include a snapshot of the
   * FeatureCell’s current state value.
   */
  wantsState?: boolean;

  /**
   * Whether emitted events should contain the operation payload such as
   * reducer results, merge patches, or replacement values.
   */
  wantsPayload?: boolean;

  /**
   * Whether error information should be included in emitted insight events.
   */
  wantsErrors?: boolean;
}
