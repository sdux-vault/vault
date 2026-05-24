import { isTestEnv } from './testing-environment.util';

/** Tracks whether Vault development mode has been enabled. */
let devMode: boolean | null = null;

/** Singleton accessor for Vault development mode state. */
export const DevMode = {
  get active(): boolean {
    return devMode === true;
  },

  setDevMode(isDevMode: boolean): void {
    if (devMode !== null && !isTestEnv.active) {
      throw new Error('[vault] DevMode has already been initialized.');
    }

    devMode = isDevMode;
  }
};
