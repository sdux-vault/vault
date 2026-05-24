/** Shape representing a serialized FeatureCell entry in the debug registry. */
export interface SerializedFeatureCellShape {
  /** Unique key identifying the FeatureCell. */
  key: string;

  /** Whether behaviors have been registered for this cell. */
  behaviorsRegistered: boolean;
  /** Whether controllers have been registered for this cell. */
  controllersRegistered: boolean;

  /** Serialized fluent API extensions, or null if none exist. */
  // eslint-disable-next-line
  fluentApis: any | null;

  /** Serialized behavior instances attached to this cell. */
  // eslint-disable-next-line
  behaviors: any[];
  /** Serialized controller instances attached to this cell. */
  // eslint-disable-next-line
  controllers: any[];
}
