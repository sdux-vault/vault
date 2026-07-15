import { registerVersion } from '@sdux-vault/shared';

/** Package name used for Vue core-extensions version registration. */
const SDUX_PACKAGE = '@sdux-vault/vue';
/** Current version of the Vue core-extensions package. */
const SDUX_VERSION = '1.0.0';

registerVersion(SDUX_PACKAGE, SDUX_VERSION);
