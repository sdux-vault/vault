import './version.register';

describe('@sdux-vault/shared version registration', () => {
  it('should register the shared version on globalThis.sdux.versions', () => {
    expect(globalThis.sdux).toBeUndefined();
    expect(globalThis.sdux?.debugWidget).toBeUndefined();
    expect(globalThis.sdux?.debugWidget?.versions).toBeUndefined();
  });
});
