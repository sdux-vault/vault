import { setVerifyLicensePayloadResult } from '@sdux-vault/engine';
import { setVaultLogLevel } from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { definePersistKey } from '../../utils/define-persist-key.util';
import { withSessionStoragePersistBehavior } from './with-session-storage-persist.behavior';

describe('Behavior: Session Storage Persist Behavior', () => {
  let behavior: any;

  beforeEach(() => {
    spyOn(sessionStorage, 'setItem');
    spyOn(sessionStorage, 'removeItem');

    setVaultLogLevel('warn');

    behavior = new withSessionStoragePersistBehavior('behavior-key', {
      featureCellKey: 'userCell'
    } as any);
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  describe('peristState', () => {
    it('should have default properties', () => {
      expect(behavior.critical).toBeTrue();
      expect(behavior.type).toBe('persist');
      expect(behavior.key).toBe('behavior-key');
    });

    it('should have default properties', () => {
      expect(withSessionStoragePersistBehavior.critical).toBeFalse();
      expect(withSessionStoragePersistBehavior.type).toBe('persist');
      expect(withSessionStoragePersistBehavior.key).toBe(
        'SDUX::Behavior::Persist::SessionStorage'
      );
    });

    it('should persist a serializable object to sessionStorage', () => {
      const state = { id: 1, name: 'Ada' };

      behavior.persistState(state);

      const expectedKey = definePersistKey(
        'sessionStorage',
        'userCell',
        'behavior-key'
      );
      expect(sessionStorage.setItem).toHaveBeenCalledOnceWith(
        expectedKey,
        JSON.stringify(state)
      );
      expect(sessionStorage.removeItem).not.toHaveBeenCalled();
    });

    it('should remove the item when state is undefined', () => {
      behavior.persistState(undefined);

      const expectedKey = definePersistKey(
        'sessionStorage',
        'userCell',
        'behavior-key'
      );
      expect(sessionStorage.removeItem).toHaveBeenCalledOnceWith(expectedKey);
      expect(sessionStorage.setItem).not.toHaveBeenCalled();
    });

    it('should persist primitives', () => {
      behavior.persistState(123 as any);

      const expectedKey = definePersistKey(
        'sessionStorage',
        'userCell',
        'behavior-key'
      );
      expect(sessionStorage.setItem).toHaveBeenCalledOnceWith(
        expectedKey,
        '123'
      );
    });

    it('should persist null explicitly', () => {
      behavior.persistState(null as any);

      const expectedKey = definePersistKey(
        'sessionStorage',
        'userCell',
        'behavior-key'
      );
      expect(sessionStorage.setItem).toHaveBeenCalledOnceWith(
        expectedKey,
        'null'
      );
    });

    it('should catch JSON stringify errors and NOT throw', () => {
      const circular: any = {};
      circular.self = circular;

      expect(() => behavior.persistState(circular)).not.toThrow();

      expect(sessionStorage.setItem).not.toHaveBeenCalled();
      expect(sessionStorage.removeItem).not.toHaveBeenCalled();
    });

    it('should catch sessionStorage.setItem errors and NOT throw', () => {
      (sessionStorage.setItem as jasmine.Spy).and.callFake(() => {
        throw new Error('Storage full');
      });

      expect(() => behavior.persistState({ ok: true })).not.toThrow();
    });
  });

  describe('clearState', () => {
    it('should clear storage key on clearState()', () => {
      behavior.clearState();

      const expectedKey = definePersistKey(
        'sessionStorage',
        'userCell',
        'behavior-key'
      );
      expect(sessionStorage.removeItem).toHaveBeenCalledTimes(1);
      expect(sessionStorage.removeItem).toHaveBeenCalledWith(expectedKey);
    });

    it('should catch and swallow errors during clearState()', () => {
      // force an exception
      sessionStorage.removeItem = () => {
        throw new Error('storage permission denied');
      };
      spyOn(sessionStorage, 'removeItem').and.callThrough();

      expect(() => behavior.clearState()).not.toThrow();
    });
  });

  describe('loadState', () => {
    it('should return undefined when no state exists', () => {
      sessionStorage.getItem = jasmine.createSpy().and.returnValue(null);

      const result = behavior.loadState();

      expect(sessionStorage.getItem).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });

    it('should load and parse stored JSON into an object', () => {
      const stored = { id: 1, name: 'Ada' };
      sessionStorage.getItem = jasmine
        .createSpy()
        .and.returnValue(JSON.stringify(stored));

      const result = behavior.loadState();

      expect(sessionStorage.getItem).toHaveBeenCalledTimes(1);
      expect(result).toEqual(stored);
    });

    it('should load primitives correctly', () => {
      sessionStorage.getItem = jasmine.createSpy().and.returnValue('123');

      const result = behavior.loadState();

      expect(result).toBe(123);
    });

    it('should load null explicitly', () => {
      sessionStorage.getItem = jasmine.createSpy().and.returnValue('null');

      const result = behavior.loadState();

      expect(result).toBeNull();
    });

    it('should catch JSON.parse errors and return undefined', () => {
      sessionStorage.getItem = jasmine
        .createSpy()
        .and.returnValue('{ bad json');

      const result = behavior.loadState();

      expect(result).toBeUndefined();
    });

    it('should catch sessionStorage.getItem errors and NOT throw', () => {
      sessionStorage.getItem = jasmine
        .createSpy()
        .and.throwError('access denied');

      expect(() => behavior.loadState()).not.toThrow();
      const result = behavior.loadState();
      expect(result).toBeUndefined();
    });

    it('should valid destroy is noop', async () => {
      spyOn(console, 'warn');
      behavior.destroy();
      await flushVaultPipeline();
      // eslint-disable-next-line
      expect(console.warn).toHaveBeenCalledWith(
        '[vault]',
        'behavior-key - destroy "noop"'
      );
    });

    it('should valid reset is noop', async () => {
      const expectedKey = definePersistKey(
        'sessionStorage',
        'userCell',
        'behavior-key'
      );
      spyOn(console, 'warn');
      behavior.reset();
      await flushVaultPipeline();
      // eslint-disable-next-line
      expect(console.warn).toHaveBeenCalledWith(
        '[vault]',
        'behavior-key - reset called (sessionStorage cleared)'
      );

      expect(sessionStorage.removeItem).toHaveBeenCalledTimes(1);
      expect(sessionStorage.removeItem).toHaveBeenCalledWith(expectedKey);
    });
  });

  describe('license validation', () => {
    it('should validate license as true when verifyLicensePayload resolves true', async () => {
      setVerifyLicensePayloadResult(true);

      const licensed = new withSessionStoragePersistBehavior('licensed-key', {
        featureCellKey: 'userCell',
        licensePayload: 'valid-signed-token'
      } as any);

      await flushVaultPipeline();

      expect(licensed).toBeTruthy();
    });

    it('should validate license as false when verifyLicensePayload resolves false', async () => {
      setVerifyLicensePayloadResult(false);

      const licensed = new withSessionStoragePersistBehavior('licensed-key', {
        featureCellKey: 'userCell',
        licensePayload: 'bad-token'
      } as any);

      await flushVaultPipeline();

      expect(licensed).toBeTruthy();
    });
  });
});
