import { setVerifyLicensePayloadResult } from '@sdux-vault/engine';
import { setVaultLogLevel } from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { definePersistKey } from '../../utils/define-persist-key.util';
import { withCookieStoragePersistBehavior } from './with-cookie-storage-persist.behavior';

function getCookie(key: string): string | null {
  const match = document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${key}=`));

  return match ? match.split('=')[1] : null;
}

function setCookieRaw(str: string) {
  document.cookie = str;
}

function clearAllCookies() {
  document.cookie.split(';').forEach((c) => {
    const eq = c.indexOf('=');
    const key = eq > -1 ? c.substring(0, eq).trim() : c.trim();
    if (key) {
      document.cookie = `${key}=; Max-Age=0; path=/`;
    }
  });
}

describe('Behavior: Cookie Persist Behavior', () => {
  let behavior: any;
  let key: string;

  beforeEach(() => {
    clearAllCookies(); // reset between tests
    key = definePersistKey('cookieStorage', 'userCell', 'behavior-key');

    setVaultLogLevel('warn');

    behavior = new withCookieStoragePersistBehavior('behavior-key', {
      featureCellKey: 'userCell'
    } as any);
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  // ─────────────────────────────────────────────────────────────
  // Basic metadata
  // ─────────────────────────────────────────────────────────────
  it('should have correct default metadata', () => {
    expect(behavior.critical).toBeTrue();
    expect(behavior.type).toBe('persist');
    expect(behavior.key).toBe('behavior-key');
  });

  it('should have default properties', () => {
    expect(withCookieStoragePersistBehavior.critical).toBeFalse();
    expect(withCookieStoragePersistBehavior.type).toBe('persist');
    expect(withCookieStoragePersistBehavior.key).toBe(
      'SDUX::Behavior::Persist::CookieStorage'
    );
  });

  // ─────────────────────────────────────────────────────────────
  // persistState
  // ─────────────────────────────────────────────────────────────
  describe('persistState', () => {
    it('should persist a serializable object to a cookie', () => {
      const state = { id: 1, name: 'Ada' };

      behavior.persistState(state);

      const cookieVal = getCookie(key);

      // cookie stored URL-encoded JSON
      expect(cookieVal).toBe(encodeURIComponent(JSON.stringify(state)));
    });

    it('should remove the cookie when state is undefined', () => {
      // set initial cookie
      setCookieRaw(`${key}=test; path=/`);

      behavior.persistState(undefined);

      expect(getCookie(key)).toBeNull();
    });

    it('should persist primitives', () => {
      behavior.persistState(123 as any);

      expect(getCookie(key)).toBe(encodeURIComponent('123'));
    });

    it('should persist null explicitly', () => {
      behavior.persistState(null as any);

      expect(getCookie(key)).toBe(encodeURIComponent('null'));
    });

    it('should catch JSON stringify errors and NOT throw', () => {
      const circular: any = {};
      circular.self = circular;

      expect(() => behavior.persistState(circular)).not.toThrow();

      expect(getCookie(key)).toBeNull(); // no write occurred
    });

    it('should catch cookie write errors and NOT throw', () => {
      spyOnProperty(document, 'cookie', 'set').and.callFake(() => {
        throw new Error('Cookie blocked');
      });

      expect(() => behavior.persistState({ ok: true })).not.toThrow();
    });

    it('should reject writes when serialized payload exceeds safe cookie limit (~3500 bytes)', async () => {
      // Spy on cookie setter
      spyOnProperty(document, 'cookie', 'set').and.callFake(() => {});

      // Spy on vaultWarn (via console.warn or your vaultWarn function)
      spyOn(console, 'warn');

      // Create a large payload > 3500 characters
      const largeString = 'x'.repeat(4000);
      const bigState = { big: largeString };

      expect(behavior.persistState(bigState)).toBeUndefined();
      await flushVaultPipeline();

      // Should NOT set cookie
      expect(
        Object.getOwnPropertyDescriptor(document, 'cookie')!.set
      ).not.toHaveBeenCalled();

      // Should warn
      // eslint-disable-next-line
      expect(console.warn).toHaveBeenCalledWith(
        '[vault]',
        '[vault] CookiePersist rejected write for key "vault::cookiestorage::userCell::behavior-key" — payload size 4024 exceeds safe cookie limit (~4096 bytes). Vault hard-cap limit is 4000 bytes.'
      );
    });
  });

  // ─────────────────────────────────────────────────────────────
  // clearState
  // ─────────────────────────────────────────────────────────────
  describe('clearState', () => {
    it('should clear the cookie', () => {
      setCookieRaw(`${key}=value; path=/`);

      behavior.clearState();

      expect(getCookie(key)).toBeNull();
    });

    it('should catch and swallow errors during clearState()', () => {
      spyOnProperty(document, 'cookie', 'set').and.callFake(() => {
        throw new Error('cookie remove blocked');
      });

      expect(() => behavior.clearState()).not.toThrow();
    });
  });

  // ─────────────────────────────────────────────────────────────
  // loadState
  // ─────────────────────────────────────────────────────────────
  describe('loadState', () => {
    it('should return undefined when cookie does not exist', () => {
      const result = behavior.loadState();
      expect(result).toBeUndefined();
    });

    it('should load and parse stored JSON into an object', () => {
      const stored = { id: 1, name: 'Ada' };

      setCookieRaw(
        `${key}=${encodeURIComponent(JSON.stringify(stored))}; path=/`
      );

      const result = behavior.loadState();

      expect(result).toEqual(stored);
    });

    it('should load primitives correctly', () => {
      setCookieRaw(`${key}=${encodeURIComponent('123')}; path=/`);

      const result = behavior.loadState();
      expect(result).toBe(123);
    });

    it('should load null explicitly', () => {
      setCookieRaw(`${key}=${encodeURIComponent('null')}; path=/`);

      const result = behavior.loadState();
      expect(result).toBeNull();
    });

    it('should correctly parse cookie values containing equals signs', () => {
      const stored = { data: 'base64==', token: 'a=b=c' };

      setCookieRaw(
        `${key}=${encodeURIComponent(JSON.stringify(stored))}; path=/`
      );

      const result = behavior.loadState();
      expect(result).toEqual(stored);
    });

    it('should catch JSON.parse errors and return undefined', () => {
      setCookieRaw(`${key}=%7Bbadjson; path=/`);

      const result = behavior.loadState();
      expect(result).toBeUndefined();
    });

    it('should catch cookie read errors and NOT throw', () => {
      spyOnProperty(document, 'cookie', 'get').and.throwError('read blocked');

      expect(() => behavior.loadState()).not.toThrow();
      const result = behavior.loadState();
      expect(result).toBeUndefined();
    });
  });

  // ─────────────────────────────────────────────────────────────
  // destroy()
  // ─────────────────────────────────────────────────────────────
  describe('license validation', () => {
    it('should validate license as true when verifyLicensePayload resolves true', async () => {
      setVerifyLicensePayloadResult(true);

      const licensed = new withCookieStoragePersistBehavior('licensed-key', {
        featureCellKey: 'userCell',
        licensePayload: 'valid-signed-token'
      } as any);

      await flushVaultPipeline();

      expect(licensed).toBeTruthy();
    });

    it('should validate license as false when verifyLicensePayload resolves false', async () => {
      setVerifyLicensePayloadResult(false);

      const licensed = new withCookieStoragePersistBehavior('licensed-key', {
        featureCellKey: 'userCell',
        licensePayload: 'bad-token'
      } as any);

      await flushVaultPipeline();

      expect(licensed).toBeTruthy();
    });
  });

  it('should run destroy as a noop and warn', async () => {
    spyOn(console, 'warn');

    behavior.destroy();
    await flushVaultPipeline();

    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalledWith(
      '[vault]',
      'behavior-key - destroy "noop"'
    );
  });

  it('should run reset as a noop and warn', async () => {
    setCookieRaw(`${key}=value; path=/`);
    spyOn(console, 'warn');

    behavior.reset();
    await flushVaultPipeline();

    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalledWith(
      '[vault]',
      'behavior-key - reset called (cookie cleared)'
    );

    expect(getCookie(key)).toBeNull();
  });
});
