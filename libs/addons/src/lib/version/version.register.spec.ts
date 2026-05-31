import './version.register';

describe('@sdux-vault/addons version registration', () => {
  it('should register the addons version on globalThis.sdux.versions', () => {
    expect(globalThis.sdux).toBeUndefined();
    expect(globalThis.sdux?.versions).toBeUndefined();
  });
});
