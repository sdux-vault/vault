import { SDuXShape } from '../../shapes/sdux/sdux.shape';
import { DevMode } from '../dev-mode/dev-mode.util';

/**
 * Registers a package version on the global SDuX debug widget when dev mode is active.
 *
 * @param packageName - The npm package name to register.
 * @param version - The semver version string.
 */
export const registerVersion = (packageName: string, version: string): void => {
  if (!DevMode.active || typeof globalThis === 'undefined') return;

  const sdux = (globalThis.sdux ??= {} as SDuXShape);
  const debug = (sdux.debugWidget ??= {});
  const versions = (debug.versions ??= {});

  if (versions[packageName] === version) return;

  versions[packageName] = version;
};
