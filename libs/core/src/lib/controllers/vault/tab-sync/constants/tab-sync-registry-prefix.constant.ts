/**
 * localStorage key prefix for the cross-tab registry.
 * Each FeatureCell appends its key to form the full storage key,
 * enabling deterministic peer detection without asynchronous
 * BroadcastChannel round-trips.
 */
export const TAB_SYNC_REGISTRY_PREFIX = 'sdux-vault:tab-registry';
