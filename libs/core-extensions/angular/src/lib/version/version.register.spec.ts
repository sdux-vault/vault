import './version.register';

describe('@sdux-vault/angular version registration', () => {
  it('should register the angular version on globalThis.sdux.versions', () => {
    expect(globalThis.sdux).toBeUndefined();
    expect(globalThis.sdux?.versions).toBeUndefined();
  });
});
