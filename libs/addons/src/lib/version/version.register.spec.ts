import './version.register';

describe('@sdux-vault/addons version registration', () => {
  it('should register the addons version on globalThis.sdux.versions', () => {
    expect(globalThis.sdux).toBeDefined();
    expect(globalThis.sdux?.versions?.['@sdux-vault/addons']).toBeDefined();
  });
});
