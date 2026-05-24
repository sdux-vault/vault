/** Cached result value returned by the license payload verification stub. */
let resolveValue = true;

/**
 * Stub that simulates license payload verification.
 *
 * @param _licensePayload - The license payload to verify.
 * @returns A promise resolving to the configured result value.
 */
export async function verifyLicensePayload(
  _licensePayload: unknown
): Promise<boolean> {
  return Promise.resolve(resolveValue);
}

/**
 * Sets the result returned by the verifyLicensePayload stub.
 *
 * @param value - The boolean result to return on subsequent calls.
 */
export function setVerifyLicensePayloadResult(value: boolean): void {
  resolveValue = value;
}
