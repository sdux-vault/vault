/** Stub object that simulates license token verification. */
export const VerifyLicenseToken = {
  verify: async (_token: string): Promise<boolean> => {
    return Promise.resolve(true);
  }
};
