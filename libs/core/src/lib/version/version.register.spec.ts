import './version.register';

describe('@sdux-vault/core version registration', () => {
  it('should register the core version on globalThis.sdux.versions', () => {
    expect(globalThis.sdux).toBeDefined();
    expect(globalThis.sdux?.versions?.['@sdux-vault/core']).toBeDefined();
  });
});
