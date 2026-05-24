const SDUX_VAULT_INVALID_LICENSE = Object({
  licenseId: 'sdux-vault',
  payload: 'invalid'
});

export function getSDuXVaultInvalidLicense() {
  return structuredClone(SDUX_VAULT_INVALID_LICENSE);
}
