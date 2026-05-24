/**
 * String token used to uniquely identify the DevTools Logging FeatureCell.
 *
 * This key is referenced by the DevTools service, monitor utilities,
 * and the router configuration to ensure all DevTools-related state
 * is consistently mapped to the same FeatureCell instance.
 *
 * The value is stable across versions to maintain compatibility with
 * external tools such as the Chrome DevTools extension.
 */
export const DEVTOOLS_LOGGING_KEY_CONSTANT =
  'vault::devtools::logging::feature::cell';
