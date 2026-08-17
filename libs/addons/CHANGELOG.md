# Changelog

All notable changes to `@sdux-vault/addons` are documented in this file.

This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-08-17

### Added

- **`withArrayByIdMergeBehavior`** (`with-array-by-id-merge`)
  - Merges array entities by a configurable identifier property.
  - Updates matching entities while preserving their existing array position.
  - Appends incoming entities that do not already exist.
  - Supports deleting matching entities by identifier.
  - Configures the identifier with `withArrayMergeId({ idKey: 'id' })`.

  See the [array-by-ID merge behavior documentation](../../apps/docs-app/app/docs/pipeline/behaviors/components/merge/array-by-id-merge/array-by-id-merge.pipeline.component.html)
  and [implementation](src/lib/behaviors/merge/array/array-by-id-merge/with-array-by-id-merge.behavior.ts).

## [1.0.4] - 2026-07-26

See the [1.0.4 release](https://github.com/sdux-vault/vault/releases/tag/addons%401.0.4)
for the published changes.

[1.1.0]: https://github.com/sdux-vault/vault/releases/tag/addons%401.1.0
[1.0.4]: https://github.com/sdux-vault/vault/releases/tag/addons%401.0.4
