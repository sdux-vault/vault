import { registerVersion } from '@sdux-vault/shared';

/** Package name used for core version registration. */
const SDUX_PACKAGE = '@sdux-vault/core';
/** Current version of the core package. */
const SDUX_VERSION = '0.9.0';

registerVersion(SDUX_PACKAGE, SDUX_VERSION);
