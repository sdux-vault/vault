import { CONTROLLER_META } from '../constants/controller-meta.constant';
import { ControllerMetaShape } from '../shapes/controller/controller-meta.shape';
import { ControllerTypes } from '../types/controller/controller.type';
import { defineBehaviorKey } from '../utils/behavior/define-behavior-key.util';
import { VaultController } from './vault-controller.decorator';

describe('Decorator: VaultController', () => {
  const META: ControllerMetaShape = {
    type: ControllerTypes.ReplayGlobalError,
    key: defineBehaviorKey('Test', 'ReplayGlobalError'),
    critical: true,
    wantsConfig: true,
    configKey: 'config-key',
    needsLicense: true,
    licenseId: 'license-key'
  };

  it('should attach metadata object to the target constructor', () => {
    @VaultController(META)
    class TestClass {}

    expect((TestClass as any)[CONTROLLER_META]).toEqual(META);
  });

  it('should set static type, key, and critical on the target', () => {
    @VaultController(META)
    class TestClass {}

    expect((TestClass as any).type).toBe(META.type);
    expect((TestClass as any).key).toBe(META.key);
    expect((TestClass as any).critical).toBeTrue();
    expect((TestClass as any).wantsConfig).toBeTrue();
    expect((TestClass as any).configKey).toBe('config-key');
    expect((TestClass as any).needsLicense).toBeTrue();
    expect((TestClass as any).licenseId).toBe('license-key');
  });

  it('should NOT set static fields when metadata fields are undefined', () => {
    const partialMeta: ControllerMetaShape = {
      type: undefined as any,
      key: undefined as any,
      critical: undefined,
      needsLicense: undefined,
      licenseId: undefined,
      wantsConfig: undefined
    };

    @VaultController(partialMeta)
    class TestClass {}

    expect((TestClass as any)[CONTROLLER_META]).toEqual(partialMeta);

    // Static props should not exist
    expect((TestClass as any).type).toBeUndefined();
    expect((TestClass as any).key).toBeUndefined();
    expect((TestClass as any).critical).toBeUndefined();
    expect((TestClass as any).wantsConfig).toBeFalse();
    expect((TestClass as any).needsLicense).toBeFalse();
    expect((TestClass as any).licenseId).toBeUndefined();
  });

  it('should override existing static properties on the class', () => {
    @VaultController(META)
    class TestClass {
      static type = 'old';
      static key = 'old-key';
      static critical = false;
      static needsLicense = false;
      static licenseId = 'taco';
      static wantsConfig = false;
      static configKeey = 'hello';
    }

    expect((TestClass as any).type).toBe(META.type);
    expect((TestClass as any).key).toBe(META.key);
    expect((TestClass as any).critical).toBeTrue();
    expect((TestClass as any).needsLicense).toBeTrue();
    expect((TestClass as any).licenseId).toBe('license-key');
    expect((TestClass as any).wantsConfig).toBeTrue();
    expect((TestClass as any).configKeey).toBe('hello');
  });

  it('should allow multiple behavior decorators; the last one wins', () => {
    const meta1: ControllerMetaShape = {
      type: ControllerTypes.ReplayGlobalError,
      key: defineBehaviorKey('A', 'One'),
      critical: false,
      wantsConfig: true,
      configKey: 'config-key',
      needsLicense: false,
      licenseId: 'bell'
    };

    const meta2: ControllerMetaShape = {
      type: ControllerTypes.ReplayGlobalError,
      key: defineBehaviorKey('B', 'Two'),
      critical: true,
      wantsConfig: false,
      configKey: 'wrong',
      needsLicense: true,
      licenseId: 'taco'
    };

    @VaultController(meta1)
    @VaultController(meta2)
    class TestClass {}

    expect((TestClass as any)[CONTROLLER_META]).toEqual(meta1);
    expect((TestClass as any).type).toBe(meta1.type);
    expect((TestClass as any).key).toBe(meta1.key);
    expect((TestClass as any).critical).toBeFalse();
    expect((TestClass as any).needsLicense).toBeFalse();
    expect((TestClass as any).licenseId).toBe('bell');
    expect((TestClass as any).wantsConfig).toBeTrue();
  });

  it('should work when applied to classes with constructors or instance props', () => {
    @VaultController(META)
    class TestClass {
      value = 123;
      constructor() {}
    }

    expect((TestClass as any)[CONTROLLER_META]).toBe(META);
    expect(new TestClass().value).toBe(123);
  });

  it('should leave prototype and instance fields untouched', () => {
    @VaultController(META)
    class TestClass {
      foo = 'bar';
      method() {
        return 'ok';
      }
    }

    const instance = new TestClass();

    expect(instance.foo).toBe('bar');
    expect(instance.method()).toBe('ok');
  });

  it('should not throw when metadata contains unexpected fields', () => {
    const weirdMeta: any = {
      type: ControllerTypes.ReplayGlobalError,
      key: 'op',
      critical: false,
      random: 123,
      another: 'hello'
    };

    expect(() => {
      @VaultController(weirdMeta)
      // eslint-disable-next-line
      class WeirdClass {}
    }).not.toThrow();
  });

  it('should correctly assign undefined metadata without errors', () => {
    const meta: ControllerMetaShape = {
      type: undefined as any,
      key: 'something',
      critical: undefined
    };

    @VaultController(meta)
    class TestClass {}

    expect((TestClass as any)[CONTROLLER_META]).toEqual(meta);
    expect((TestClass as any).type).toBeUndefined();
    expect((TestClass as any).key).toBe('something');
    expect((TestClass as any).critical).toBeUndefined();
  });

  it('should support decorator applied to abstract classes', () => {
    @VaultController(META)
    abstract class AbstractClass {}

    expect((AbstractClass as any)[CONTROLLER_META]).toEqual(META);
    expect((AbstractClass as any).type).toBe(META.type);
  });

  it('should not mutate the metadata object passed into the decorator', () => {
    const metaCopy = { ...META };

    @VaultController(metaCopy)
    // eslint-disable-next-line
    class TestClass {}

    // If mutated, they wouldn't match
    expect(metaCopy).toEqual(META);
  });
});
