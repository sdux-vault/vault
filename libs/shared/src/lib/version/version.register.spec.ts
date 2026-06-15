import { registerVersion } from '../utils/version/version.register';
import './version.register';

describe('@sdux-vault/shared version registration', () => {
  it('should register the shared version on globalThis.sdux.versions', () => {
    // Re-trigger in case another test cleaned globalThis.sdux after the static import
    registerVersion('@sdux-vault/shared', '0.9.3');

    expect(globalThis.sdux).toBeDefined();
    expect(globalThis.sdux?.versions?.['@sdux-vault/shared']).toBeDefined();
  });
});
