import { setVerifyLicensePayloadResult } from '@sdux-vault/engine';
import {
  BehaviorClassContext,
  BehaviorTypes,
  setVaultLogLevel,
  VaultEncryptionIntegrityError
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { AES256BehaviorOptions } from './options/aes256-behavior.options';
import {
  cryptoPlatform,
  withAes256EncryptBehavior
} from './with-aes256-encrypt.behavior';

describe('Behavior: AES-256 Encrypt', () => {
  let behavior: any;
  let cell: any;
  let warnSpy: any;
  let behaviorConfig: any;
  let originalAtob: any;
  let originalBtoa: any;
  let originalBuffer: any;

  const SECRET = 'my-test-secret';
  beforeEach(() => {
    warnSpy = spyOn(console, 'warn');
    setVaultLogLevel('warn');
    behaviorConfig = new Map<string, unknown>();
    originalAtob = (globalThis as any).atob;
    originalBtoa = (globalThis as any).btoa;
    originalBuffer = (globalThis as any).Buffer;

    cell = {};
  });

  afterEach(() => {
    (globalThis as any).atob = originalAtob;
    (globalThis as any).btoa = originalBtoa;
    (globalThis as any).Buffer = originalBuffer;
    setVaultLogLevel('off');
  });

  describe('with config', () => {
    beforeEach(() => {
      withAes256EncryptBehavior.installFluentApi(cell, behaviorConfig);

      behavior = new withAes256EncryptBehavior('behavior key', {
        behaviorConfig: {
          aes256Secret: SECRET,
          salt: cell.generateSalt(),
          iterations: 300_000
        }
      } as BehaviorClassContext);
    });

    it('should expose correct metadata', () => {
      expect(behavior.type).toBe(BehaviorTypes.Encrypt);
      expect(behavior.key).toBe('behavior key');
      expect(behavior.critical).toBeTrue();
    });

    it('should have default decorator properties', () => {
      expect(withAes256EncryptBehavior.critical).toBeTrue();
      expect(withAes256EncryptBehavior.type).toBe('encrypt');
      expect(withAes256EncryptBehavior.key).toBe(
        'SDUX::Behavior::Encrypt::Aes256'
      );
      expect(withAes256EncryptBehavior.wantsConfig).toBeTrue();
      expect(withAes256EncryptBehavior.configKey).toBe('setAes256Secret');
      expect(typeof withAes256EncryptBehavior.installFluentApi).toBe(
        'function'
      );
      expect(withAes256EncryptBehavior.needsLicense).toBeTrue();
      expect(withAes256EncryptBehavior.licenseId).toBe('sdux-vault');
    });

    it('should throw if WebCrypto is unavailable at construction', () => {
      spyOn(cryptoPlatform, 'getWebCrypto').and.returnValue(undefined as any);

      expect(() => {
        new withAes256EncryptBehavior('k', {
          behaviorConfig: {
            aes256Secret: 'x',
            salt: new Uint8Array(16),
            iterations: 200_000
          }
        } as any);
      }).toThrowError(
        '[vault] WebCrypto API not available. AES-256 requires secure crypto support.'
      );
    });

    describe('fluent api', () => {
      it('should set the options', () => {
        withAes256EncryptBehavior.installFluentApi(cell, behaviorConfig);
        cell.setAes256Secret({
          aes256Secret: 'x',
          salt: new Uint8Array(16),
          iterations: 200_000
        });

        expect(behaviorConfig.get('setAes256Secret')).toEqual({
          aes256Secret: 'x',
          salt: new Uint8Array(16),
          iterations: 200_000
        });
      });

      it('generateSalt should throw if crypto.getRandomValues is unavailable', () => {
        spyOn(cryptoPlatform, 'getWebCrypto').and.returnValue({} as any);

        withAes256EncryptBehavior.installFluentApi(cell, behaviorConfig);

        expect(() => cell.generateSalt()).toThrowError(
          '[vault] Secure random generator not available'
        );
      });

      it('generateSalt should throw if length < 16', () => {
        withAes256EncryptBehavior.installFluentApi(cell, behaviorConfig);
        expect(() => cell.generateSalt(8)).toThrowError(
          '[vault] Salt must be at least 16 bytes'
        );
      });
    });

    it('should not reinitialize cryptoKey if already initialized', async () => {
      await behavior.encryptState({} as any, { x: 1 });
      await behavior.encryptState({} as any, { y: 2 });

      await flushVaultPipeline();

      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('should use Buffer fallback when btoa is unavailable', async () => {
      // Disable browser base64
      (globalThis as any).btoa = undefined;

      // Minimal Buffer shim (enough for base64)
      (globalThis as any).Buffer = {
        from(input: Uint8Array | string) {
          if (typeof input === 'string') {
            return {
              toString: () => input
            };
          }

          return {
            toString: (format: string) => {
              if (format !== 'base64') throw new Error('Unsupported encoding');
              return originalBtoa(
                String.fromCharCode(...new Uint8Array(input as any))
              );
            }
          };
        }
      };

      const encrypted = await behavior.encryptState({} as any, { a: 1 });
      const decrypted = await behavior.decryptState({} as any, encrypted);

      expect(decrypted).toEqual({ a: 1 });
    });

    it('should throw if neither btoa nor Buffer is available', async () => {
      (globalThis as any).btoa = undefined;
      (globalThis as any).Buffer = undefined;

      let caught: any;

      try {
        await behavior.encryptState({} as any, { a: 1 });
      } catch (e) {
        caught = e;
      }

      expect(caught).toBeTruthy();
      expect(caught.message).toContain('Base64 encoding not supported');
    });

    describe('encrypt', () => {
      it('should encrypt a plain object into an envelope', async () => {
        spyOn(crypto, 'getRandomValues').and.returnValue(
          new Uint8Array(12).fill(7)
        );

        const data = { name: 'Ada' };
        const encrypted = await behavior
          .encryptState({} as any, data)
          .catch((error: any) => {
            expect(error.message).toBe('this is an error');
          });

        expect(typeof encrypted).toBe('object');
        const env = encrypted as any;

        expect(env.alg).toBe('AES-256-GCM');
        expect(env.iv).toBeTruthy();
        expect(env.data).toBeTruthy();
        expect(env.v).toBe(1);

        // should NOT mutate input
        expect(data).toEqual({ name: 'Ada' });
      });

      it('should return raw value when encrypting undefined or null', async () => {
        expect(
          await behavior.encryptState({} as any, undefined)
        ).toBeUndefined();
        expect(await behavior.encryptState({} as any, null)).toBeNull();
      });

      it('should fail-safe if encryption throws and return original value', async () => {
        spyOn(crypto.subtle, 'encrypt').and.throwError('boom');

        const input = { x: 1 };

        await expectAsync(
          behavior.encryptState({} as any, input)
        ).toBeRejectedWithError('boom');
      });
    });

    describe('Decrypt', () => {
      it('should decrypt an encrypted envelope back to original object', async () => {
        const source = { id: 3, name: 'Grace' };

        const encrypted = await behavior
          .encryptState({} as any, source)
          .catch((error: any) => {
            expect(error.message).toBe('this is an error');
          });
        const decrypted = await behavior
          .decryptState({} as any, encrypted!)
          .catch((error: any) => {
            expect(error.message).toBe('this is an error');
          });

        expect(decrypted).toEqual(source);
      });

      it('should skip decryption if value is undefined or null', async () => {
        expect(
          await behavior.decryptState({} as any, undefined)
        ).toBeUndefined();
        expect(await behavior.decryptState({} as any, null)).toBeNull();
      });

      it('should skip decryption if payload is not an AES envelope', async () => {
        const raw = { not: 'encrypted' };
        await expectAsync(
          behavior.decryptState({} as any, raw)
        ).toBeRejectedWithError(
          'behavior key invalid encrypted envelope. Expected shape { v, alg: "AES-256-GCM", iv, data }.'
        );
      });

      it('should fail-safe and return encrypted value when decryption fails', async () => {
        // encrypted envelope, but decrypt throws
        spyOn(crypto.subtle, 'decrypt').and.throwError('bad decrypt');

        const fakeEnvelope = {
          v: 1,
          alg: 'AES-256-GCM',
          iv: 'AA==',
          data: 'BB=='
        };

        await expectAsync(
          behavior.decryptState({} as any, fakeEnvelope as any)
        ).toBeRejectedWithError('bad decrypt');
      });

      it('should not throw on malformed Base64', async () => {
        const malformed = {
          v: 1,
          alg: 'AES-256-GCM',
          iv: '###FAIL###',
          data: '???'
        };

        await expectAsync(
          behavior.decryptState({} as any, malformed as any)
        ).toBeRejectedWithError(
          `Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.`
        );
      });

      it('should warn (not throw) when encrypted payload is very large', async () => {
        const large = 'x'.repeat(4_000_000);

        const encrypted = await behavior.encryptState({} as any, large);
        await behavior.decryptState({} as any, encrypted);

        expect(warnSpy).toHaveBeenCalledWith(
          '[vault]',
          jasmine.stringMatching('encrypted payload is very large')
        );
      });

      it('should throw VaultEncryptionIntegrityError when AES-GCM integrity check fails', async () => {
        const source = { id: 1 };

        const encrypted = await behavior.encryptState({} as any, source);

        // Force AES-GCM auth failure
        spyOn(crypto.subtle, 'decrypt').and.rejectWith(
          new DOMException('Integrity check failed', 'OperationError')
        );

        await expectAsync(
          behavior.decryptState({} as any, encrypted as any)
        ).toBeRejectedWithError(VaultEncryptionIntegrityError);
      });
    });

    describe('encrypt and decrypt', () => {
      beforeEach(() => {
        spyOn(crypto, 'getRandomValues').and.callFake(
          <T extends ArrayBufferView>(array: T): T => {
            const u8 = new Uint8Array(
              array.buffer,
              array.byteOffset,
              array.byteLength
            );
            u8.fill(9); // deterministic bytes
            return array;
          }
        );
      });

      it('should round-trip encrypt → decrypt for a variety of values', async () => {
        const testValues = [
          { a: 1 },
          [1, 2, 3],
          'hello world',
          12345,
          { deep: { nested: { value: true } } }
        ];

        for (const val of testValues) {
          const enc = await behavior
            .encryptState({} as any, val as any)
            .catch((error: any) => {
              expect(error.message).toBe('this is an error');
            });
          const dec = await behavior
            .decryptState({} as any, enc as any)
            .catch((error: any) => {
              expect(error.message).toBe('this is an error');
            });

          expect(dec).toEqual(val);
        }
      });
    });

    it('should decode Base64 via Buffer fallback when atob is unavailable', async () => {
      // Ensure we CAN still base64-decode inside our shim
      expect(typeof originalAtob).toBe('function');

      // Force decrypt() down the Buffer fallback path
      (globalThis as any).atob = undefined;

      // Buffer shim: Buffer.from(base64, 'base64') MUST return an iterable of bytes.
      (globalThis as any).Buffer = {
        from(input: string, encoding?: string) {
          if (encoding !== 'base64') throw new Error('Unsupported encoding');

          const bin = originalAtob(input); // real base64 decode
          const bytes = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);

          // IMPORTANT: return Uint8Array (iterable), like real Buffer does
          return bytes;
        }
      };

      const value = { x: 42 };

      const encrypted = await behavior.encryptState({} as any, value);
      const decrypted = await behavior.decryptState(
        {} as any,
        encrypted as any
      );

      expect(decrypted).toEqual(value);
    });

    it('should throw if neither atob nor Buffer is available during decrypt', async () => {
      (globalThis as any).atob = undefined;
      (globalThis as any).Buffer = undefined;

      const encrypted = {
        v: 1,
        alg: 'AES-256-GCM',
        iv: 'AA==',
        data: 'AA=='
      };

      let caught: any;
      try {
        await behavior.decryptState({} as any, encrypted as any);
      } catch (e) {
        caught = e;
      }

      expect(caught).toBeTruthy();
      expect(caught.message).toContain('Base64 decoding not supported');
    });

    it('should throw if WebCrypto is unavailable during key import', async () => {
      spyOn(cryptoPlatform, 'getWebCrypto').and.returnValue(undefined as any);

      let caught: any;
      try {
        await behavior.encryptState({} as any, { a: 1 });
      } catch (e) {
        caught = e;
      }

      expect(caught).toBeTruthy();
      expect(caught.message).toContain('WebCrypto not available');
    });

    it('should propagate errors from PBKDF2 importKey', async () => {
      const subtle = cryptoPlatform.getWebCrypto()!.subtle;

      spyOn(subtle, 'importKey').and.rejectWith(new Error('pbkdf2 failed'));

      let caught: any;
      try {
        await behavior.encryptState({} as any, { a: 1 });
      } catch (e) {
        caught = e;
      }

      expect(caught).toBeTruthy();
      expect(caught.message).toBe('pbkdf2 failed');
    });

    describe('license validation', () => {
      it('should validate license as true when verifyLicensePayload resolves true', async () => {
        setVerifyLicensePayloadResult(true);

        withAes256EncryptBehavior.installFluentApi(cell, behaviorConfig);

        const licensed = new withAes256EncryptBehavior('licensed-key', {
          behaviorConfig: {
            aes256Secret: SECRET,
            salt: cell.generateSalt(),
            iterations: 300_000
          },
          licensePayload: 'valid-signed-token'
        } as BehaviorClassContext);

        await flushVaultPipeline();

        expect(licensed).toBeTruthy();
      });

      it('should validate license as false when verifyLicensePayload resolves false', async () => {
        setVerifyLicensePayloadResult(false);

        withAes256EncryptBehavior.installFluentApi(cell, behaviorConfig);

        const licensed = new withAes256EncryptBehavior('licensed-key', {
          behaviorConfig: {
            aes256Secret: SECRET,
            salt: cell.generateSalt(),
            iterations: 300_000
          },
          licensePayload: 'bad-token'
        } as BehaviorClassContext);

        await flushVaultPipeline();

        expect(licensed).toBeTruthy();
      });
    });

    describe('Destroy/Reset', () => {
      it('should valid destroy is noop', async () => {
        behavior.destroy();
        await flushVaultPipeline();

        expect(warnSpy).toHaveBeenCalledWith(
          '[vault]',
          'behavior key - destroy "noop"'
        );
      });

      it('should valid reset is noop', async () => {
        behavior.reset();
        await flushVaultPipeline();

        expect(warnSpy).toHaveBeenCalledWith(
          '[vault]',
          'behavior key - reset called; AES key material cleared'
        );
      });
    });
  });

  describe('without config', () => {
    beforeEach(() => {});

    it('should throw if options are missing', () => {
      expect(
        () =>
          new withAes256EncryptBehavior(
            'behavior-key',
            {} as BehaviorClassContext
          )
      ).toThrowError(
        '[vault] AES256Encrypt behavior requires configuration via setAes256Secret()'
      );
    });

    it('should throw if aes256Secret option is not added', () => {
      expect(
        () =>
          new withAes256EncryptBehavior('behavior-key', {
            behaviorConfig: {} as AES256BehaviorOptions
          } as BehaviorClassContext)
      ).toThrowError('[vault] AES256Encrypt behavior requires aes256Secret');
    });

    it('should throw if aes256Secret is an empty string', () => {
      expect(
        () =>
          new withAes256EncryptBehavior('behavior-key', {
            behaviorConfig: {
              aes256Secret: ''
            } as AES256BehaviorOptions
          } as BehaviorClassContext)
      ).toThrowError('[vault] AES256Encrypt behavior requires aes256Secret');
    });

    it('should throw if aes256Secret is not a string', () => {
      expect(
        () =>
          new withAes256EncryptBehavior('behavior-key', {
            behaviorConfig: {
              aes256Secret: [] as any
            } as AES256BehaviorOptions
          } as BehaviorClassContext)
      ).toThrowError('[vault] Secret must be a non-empty string.');
    });

    it('should throw if there is not salt', () => {
      expect(
        () =>
          new withAes256EncryptBehavior('behavior-key', {
            behaviorConfig: {
              aes256Secret: 'the-secret'
            } as AES256BehaviorOptions
          } as BehaviorClassContext)
      ).toThrowError(
        '[vault] AES-256 salt must be a Uint8Array of at least 16 bytes'
      );
    });

    it('should throw if there the salt is less than 16 length', () => {
      expect(
        () =>
          new withAes256EncryptBehavior('behavior-key', {
            behaviorConfig: {
              aes256Secret: 'the-secret',
              salt: new Uint8Array(14)
            } as AES256BehaviorOptions
          } as BehaviorClassContext)
      ).toThrowError(
        '[vault] AES-256 salt must be a Uint8Array of at least 16 bytes'
      );
    });

    it('should throw if the iterations is too small', () => {
      expect(
        () =>
          new withAes256EncryptBehavior('behavior-key', {
            behaviorConfig: {
              aes256Secret: 'the-secret',
              salt: new Uint8Array(16)
            } as AES256BehaviorOptions
          } as BehaviorClassContext)
      ).toThrowError(
        '[vault] AES-256 iterations must be between 100000 and 5000000'
      );
    });

    it('should throw if the iterations is too larg', () => {
      expect(
        () =>
          new withAes256EncryptBehavior('behavior-key', {
            behaviorConfig: {
              aes256Secret: 'the-secret',
              salt: new Uint8Array(16),
              iterations: 6_000_000
            } as AES256BehaviorOptions
          } as BehaviorClassContext)
      ).toThrowError(
        '[vault] AES-256 iterations must be between 100000 and 5000000'
      );
    });
  });
});
