import { InsightConfig } from '@sdux-vault/shared';

/** Stub configuration interface for defining a FeatureCell. */
export interface FeatureCellConfig<T> {
  /** Unique key identifying the FeatureCell. */
  key: string;
  /** Initial state value for the FeatureCell. */
  initialState: T;
  /** Optional insight configuration for diagnostics. */
  insights?: InsightConfig;
}
