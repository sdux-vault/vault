import { registerVersion } from '../utils/version/version.register';

/** Package name used for version registration. */
const SDUX_PACKAGE = '@sdux-vault/shared';

/** Current package version string. */
const SDUX_VERSION = '0.7.0';

registerVersion(SDUX_PACKAGE, SDUX_VERSION);
