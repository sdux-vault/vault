import { registerVersion } from '@sdux-vault/shared';

/** Package name used for Svelte core-extensions version registration. */
const SDUX_PACKAGE = '@sdux-vault/svelte';
/** Current version of the Svelte core-extensions package. */
const SDUX_VERSION = '0.0.0';

registerVersion(SDUX_PACKAGE, SDUX_VERSION);
