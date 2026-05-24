/** Singleton accessor that detects whether code is running in a test environment. */
export const isTestEnv = {
  get active(): boolean {
    return (
      // eslint-disable-next-line
      typeof (globalThis as any).jasmine !== 'undefined' ||
      // istanbul ignore next
      // eslint-disable-next-line
      typeof (globalThis as any).jest !== 'undefined' ||
      // istanbul ignore next
      // eslint-disable-next-line
      typeof (globalThis as any).vitest !== 'undefined'
    );
  }
};
