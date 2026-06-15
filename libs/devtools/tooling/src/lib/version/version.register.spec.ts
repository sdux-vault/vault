import './version.register';

describe('@sdux-vault/devtools version registration', () => {
  it('should register the dev-tools version on globalThis.sdux.versions', () => {
    expect(globalThis.sdux).toBeDefined();
    expect(globalThis.sdux?.versions?.['@sdux-vault/devtools']).toBeDefined();
  });
});
