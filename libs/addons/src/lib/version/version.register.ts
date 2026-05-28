import { registerVersion } from '@sdux-vault/shared';

/** Package name used for addons version registration. */
const SDUX_PACKAGE = '@sdux-vault/addons';
/** Current version of the addons package. */
const SDUX_VERSION = '0.9.0';

registerVersion(SDUX_PACKAGE, SDUX_VERSION);
