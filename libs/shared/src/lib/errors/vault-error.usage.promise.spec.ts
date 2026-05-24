import { VaultErrorNameTypes } from '../types/error/vault-error-name.type';
import { VaultErrorUsageKindTypes } from '../types/error/vault-error-usage-kind.type';

import { VaultError } from './vault-error';
import { VaultUsageError } from './vault-error.usage';
import { VaultUsagePromiseError } from './vault-error.usage.promise';

describe('Error VaultUsagePromise', () => {
  let error: VaultUsagePromiseError;

  beforeEach(() => {
    error = new VaultUsagePromiseError();
  });

  it('should have the correct message', () => {
    expect(error.message.replace(/\n/g, '::')).toEqual(
      'Invalid incoming value: Promise detected.::::Promises are eager and may resolve or reject before entering the Vault pipeline.::::Use the following instead  a DeferredFactory value::::This guarantees the promise is created and executed inside the pipeline.'
    );
  });

  it('should set correct name and kind', () => {
    expect(error.name).toBe(VaultErrorNameTypes.Usage);
    expect(error.kind).toBe(VaultErrorUsageKindTypes.Promise);
  });

  it('should be instance of all error base classes', () => {
    expect(error instanceof Error).toBeTrue();
    expect(error instanceof VaultError).toBeTrue();
    expect(error instanceof VaultUsageError).toBeTrue();
    expect(error instanceof VaultUsagePromiseError).toBeTrue();
  });

  it('should preserve prototype chain correctly', () => {
    expect(Object.getPrototypeOf(error)).toBe(VaultUsagePromiseError.prototype);
    expect(Object.getPrototypeOf(VaultUsagePromiseError.prototype)).toBe(
      VaultUsageError.prototype
    );
    expect(Object.getPrototypeOf(VaultUsageError.prototype)).toBe(
      VaultError.prototype
    );
  });

  it('should be throwable and catchable by base types', () => {
    try {
      throw error;
    } catch (caught) {
      expect(caught instanceof VaultUsagePromiseError).toBeTrue();
      expect(caught instanceof VaultUsageError).toBeTrue();
      expect(caught instanceof VaultError).toBeTrue();
      expect(caught instanceof Error).toBeTrue();
    }
  });
});
