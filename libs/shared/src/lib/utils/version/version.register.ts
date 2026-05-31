import { SDuXShape } from '../../shapes/sdux/sdux.shape';

/**
 * Registers a package version on the global SDuX namespace.
 *
 * @param packageName - The npm package name to register.
 * @param version - The semver version string.
 */
export const registerVersion = (packageName: string, version: string): void => {
  // istanbul ignore next line - globalThis is always defined in supported runtimes
  if (typeof globalThis === 'undefined') return;

  const sdux = (globalThis.sdux ??= {} as SDuXShape);
  const versions = (sdux.versions ??= {});

  if (versions[packageName] === version) return;

  versions[packageName] = version;
};
