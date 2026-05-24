import './version.register';

describe('@sdux-vault/core version registration', () => {
  it('should register the core version on globalThis.sdux.versions', () => {
    expect(globalThis.sdux).toBeUndefined();
    expect(globalThis.sdux?.debugWidget).toBeUndefined();
    expect(globalThis.sdux?.debugWidget?.versions).toBeUndefined();
  });
});
