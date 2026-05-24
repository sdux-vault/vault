import { VaultErrorNameTypes } from '../types/error/vault-error-name.type';
import { VaultErrorUsageKindTypes } from '../types/error/vault-error-usage-kind.type';
import { VaultError } from './vault-error';
import { VaultUsageError } from './vault-error.usage';
import { VaultUsagePromiseFactoryRequiredError } from './vault-error.usage.promise-factory-required';

describe('Error VaultUsagePromiseFactoryRequired', () => {
  let error: VaultUsagePromiseFactoryRequiredError;

  beforeEach(() => {
    error = new VaultUsagePromiseFactoryRequiredError();
  });

  it('should have the correct message', () => {
    expect(error.message.replace(/\n/g, '::')).toEqual(
      'Invalid usage of Promise-based state API.::::You called a Promise-specific method (replaceState / mergeState),::but did not provide a function that creates a Promise.::::Expected:::• () => Promise<T>::::Received:::• A non-function value::::Promises are eager and may resolve or reject before entering the Vault pipeline.::::Always wrap promises in a function so they are created and executed::inside the pipeline.'
    );
  });

  it('should set correct name and kind', () => {
    expect(error.name).toBe(VaultErrorNameTypes.Usage);
    expect(error.kind).toBe(VaultErrorUsageKindTypes.PromiseFactoryRequired);
  });

  it('should be instance of all error base classes', () => {
    expect(error instanceof Error).toBeTrue();
    expect(error instanceof VaultError).toBeTrue();
    expect(error instanceof VaultUsageError).toBeTrue();
    expect(error instanceof VaultUsagePromiseFactoryRequiredError).toBeTrue();
  });

  it('should preserve prototype chain correctly', () => {
    expect(Object.getPrototypeOf(error)).toBe(
      VaultUsagePromiseFactoryRequiredError.prototype
    );
    expect(
      Object.getPrototypeOf(VaultUsagePromiseFactoryRequiredError.prototype)
    ).toBe(VaultUsageError.prototype);
    expect(Object.getPrototypeOf(VaultUsageError.prototype)).toBe(
      VaultError.prototype
    );
  });

  it('should be throwable and catchable by base types', () => {
    try {
      throw error;
    } catch (caught) {
      expect(
        caught instanceof VaultUsagePromiseFactoryRequiredError
      ).toBeTrue();
      expect(caught instanceof VaultUsageError).toBeTrue();
      expect(caught instanceof VaultError).toBeTrue();
      expect(caught instanceof Error).toBeTrue();
    }
  });
});
