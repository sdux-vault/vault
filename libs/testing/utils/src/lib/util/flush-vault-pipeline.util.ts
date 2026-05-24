/**
 * Flushes the Vault pipeline by awaiting multiple microtask ticks.
 *
 * @param iterations - Number of microtask ticks to flush.
 */
export const flushVaultPipeline = async (iterations = 100) => {
  for (let i = 0; i < iterations; i++) {
    await Promise.resolve();
  }
};
