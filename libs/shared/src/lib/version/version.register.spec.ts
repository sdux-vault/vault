import './version.register';

describe('@sdux-vault/shared version registration', () => {
  it('should register the shared version on globalThis.sdux.versions', () => {
    expect(globalThis.sdux).toBeDefined();
    expect(globalThis.sdux?.versions?.['@sdux-vault/shared']).toBeDefined();
  });
});
