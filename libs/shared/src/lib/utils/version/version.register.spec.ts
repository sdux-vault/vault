import { DevMode } from '../../utils/dev-mode/dev-mode.util';
import { registerVersion } from './version.register';

describe('Util: registerVersion', () => {
  const ORIGINAL_SDUX = (globalThis as any).sdux;

  beforeEach(() => {
    // Ensure clean global before every test
    delete (globalThis as any).sdux;
  });

  afterEach(() => {
    // Restore original state (important for global pollution safety)
    if (ORIGINAL_SDUX !== undefined) {
      (globalThis as any).sdux = ORIGINAL_SDUX;
    } else {
      delete (globalThis as any).sdux;
    }
  });

  describe('DevMode active', () => {
    beforeEach(() => {
      // Ensure clean global before every test
      spyOnProperty(DevMode, 'active', 'get').and.returnValue(true);
    });
    it('should create globalThis.sdux if it does not exist', () => {
      registerVersion('@sdux-vault/core', '1.0.0');

      expect((globalThis as any).sdux).toBeDefined();
      expect((globalThis as any).sdux.debugWidget.versions).toBeDefined();
    });

    it('should create versions object if it does not exist', () => {
      (globalThis as any).sdux = {};

      registerVersion('@sdux-vault/core', '1.0.0');

      expect((globalThis as any).sdux.debugWidget.versions).toBeDefined();
      expect(
        (globalThis as any).sdux.debugWidget.versions['@sdux-vault/core']
      ).toBe('1.0.0');
    });

    it('should register the version under the correct package name', () => {
      registerVersion('@sdux-vault/core', '2.3.4');

      expect(
        (globalThis as any).sdux.debugWidget.versions['@sdux-vault/core']
      ).toBe('2.3.4');
    });

    it('should overwrite an existing version for the same package', () => {
      registerVersion('@sdux-vault/core', '1.0.0');
      registerVersion('@sdux-vault/core', '2.0.0');
      registerVersion('@sdux-vault/core', '2.0.0');

      expect(
        (globalThis as any).sdux.debugWidget.versions['@sdux-vault/core']
      ).toBe('2.0.0');
    });

    it('should not remove other registered versions', () => {
      registerVersion('@sdux-vault/core', '1.0.0');
      registerVersion('@sdux-vault/addons', '1.4.1');

      expect(
        (globalThis as any).sdux.debugWidget.versions['@sdux-vault/core']
      ).toBe('1.0.0');
      expect(
        (globalThis as any).sdux.debugWidget.versions['@sdux-vault/addons']
      ).toBe('1.4.1');
    });

    it('should not throw if called multiple times', () => {
      expect(() => {
        registerVersion('@sdux-vault/core', '1.0.0');
        registerVersion('@sdux-vault/addons', '1.4.1');
        registerVersion('@sdux-vault/angular', '3.2.0');
      }).not.toThrow();
    });
  });

  describe('DevMode inactive', () => {
    beforeEach(() => {
      // Ensure clean global before every test
      spyOnProperty(DevMode, 'active', 'get').and.returnValue(false);
    });

    it('should create globalThis.sdux if it does not exist', () => {
      registerVersion('@sdux-vault/core', '1.0.0');

      expect((globalThis as any).sdux).toBeUndefined();
    });
  });
});
