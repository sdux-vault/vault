/**
 * Enumerates the available resolve strategy identifiers used by resolve
 * behaviors. These identifiers indicate how a FeatureCell obtains its initial
 * and subsequent state values during the resolve stage of the pipeline.
 *
 * - `Value` — Resolve from a synchronous, in-memory value.
 * - `HttpResource` — Resolve using an HTTP-driven resource behavior.
 * - `Observable` — Resolve from an observable stream source.
 * - `Promise` — Resolve from a promise source.
 */
export const ResolveTypes = {
  HttpResource: 'http-resource',
  Observable: 'observable',
  Promise: 'promise',
  Value: 'value'
} as const;

/**
 * Union type representing all supported resolve strategy identifiers.
 */
export type ResolveType = (typeof ResolveTypes)[keyof typeof ResolveTypes];
