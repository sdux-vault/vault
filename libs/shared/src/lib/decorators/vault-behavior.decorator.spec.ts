import { BEHAVIOR_META } from '../constants/behavior-meta.constant';
import { BehaviorMetaShape } from '../shapes/behavior-meta.shape';
import { BehaviorTypes } from '../types/behavior/behavior.type';
import { ResolveTypes } from '../types/resolve.type';
import { defineBehaviorKey } from '../utils/behavior/define-behavior-key.util';
import { VaultBehavior } from './vault-behavior.decorator';

describe('Decorator: VaultBehavior', () => {
  const META: BehaviorMetaShape = {
    type: BehaviorTypes.Resolve,
    key: defineBehaviorKey('Test', 'Resolve'),
    critical: true,
    resolveType: ResolveTypes.HttpResource,
    wantsConfig: true,
    configKey: 'config-key',
    needsLicense: true,
    licenseId: 'license-key'
  };

  it('should attach metadata object to the target constructor', () => {
    @VaultBehavior(META)
    class TestClass {}

    expect((TestClass as any)[BEHAVIOR_META]).toEqual(META);
  });

  it('should set static type, key, and critical on the target', () => {
    @VaultBehavior(META)
    class TestClass {}

    expect((TestClass as any).type).toBe(META.type);
    expect((TestClass as any).key).toBe(META.key);
    expect((TestClass as any).critical).toBeTrue();
    expect((TestClass as any).resolveType).toBe('http-resource');
    expect((TestClass as any).wantsConfig).toBeTrue();
    expect((TestClass as any).configKey).toBe('config-key');
    expect((TestClass as any).needsLicense).toBeTrue();
    expect((TestClass as any).licenseId).toBe('license-key');
  });

  it('should NOT set static fields when metadata fields are undefined', () => {
    const partialMeta: BehaviorMetaShape = {
      type: undefined as any,
      key: undefined as any,
      critical: undefined as any,
      resolveType: undefined,
      wantsConfig: undefined,
      configKey: undefined,
      needsLicense: undefined,
      licenseId: undefined
    };

    @VaultBehavior(partialMeta)
    class TestClass {}

    expect((TestClass as any)[BEHAVIOR_META]).toEqual(partialMeta);

    // Static props should not exist
    expect((TestClass as any).type).toBeUndefined();
    expect((TestClass as any).key).toBeUndefined();
    expect((TestClass as any).critical).toBeUndefined();
    expect((TestClass as any).resolveType).toBeUndefined();
    expect((TestClass as any).wantsConfig).toBeFalse();
    expect((TestClass as any).configKey).toBeUndefined();
    expect((TestClass as any).needsLicense).toBeFalse();
    expect((TestClass as any).licenseId).toBeUndefined();
  });

  it('should override existing static properties on the class', () => {
    @VaultBehavior(META)
    class TestClass {
      static type = 'old';
      static key = 'old-key';
      static critical = false;
      static resolveType = 'resolve-type';
      static wantsConfig = false;
      static configKey = 'wrong';
      static needsLicense = false;
      static licenseId = 'taco';
    }

    expect((TestClass as any).type).toBe(META.type);
    expect((TestClass as any).key).toBe(META.key);
    expect((TestClass as any).critical).toBeTrue();
    expect((TestClass as any).resolveType).toBe('http-resource');
    expect((TestClass as any).wantsConfig).toBeTrue();
    expect((TestClass as any).configKey).toBe('config-key');
    expect((TestClass as any).needsLicense).toBeTrue();
    expect((TestClass as any).licenseId).toBe('license-key');
  });

  it('should allow multiple behavior decorators; the last one wins', () => {
    const meta1: BehaviorMetaShape = {
      type: BehaviorTypes.Resolve,
      key: defineBehaviorKey('A', 'One'),
      critical: false,
      resolveType: ResolveTypes.HttpResource,
      wantsConfig: true,
      configKey: 'config-key',
      needsLicense: false,
      licenseId: 'bell'
    };

    const meta2: BehaviorMetaShape = {
      type: BehaviorTypes.Resolve,
      key: defineBehaviorKey('B', 'Two'),
      critical: true,
      resolveType: 'observable',
      wantsConfig: false,
      configKey: 'wrong',
      needsLicense: true,
      licenseId: 'taco'
    };

    @VaultBehavior(meta1)
    @VaultBehavior(meta2)
    class TestClass {}

    expect((TestClass as any)[BEHAVIOR_META]).toEqual(meta1);
    expect((TestClass as any).type).toBe(meta1.type);
    expect((TestClass as any).key).toBe(meta1.key);
    expect((TestClass as any).critical).toBeFalse();
    expect((TestClass as any).resolveType).toBe('http-resource');
    expect((TestClass as any).wantsConfig).toBeTrue();
    expect((TestClass as any).configKey).toBe('config-key');
    expect((TestClass as any).needsLicense).toBeFalse();
    expect((TestClass as any).licenseId).toBe('bell');
  });

  it('should work when applied to classes with constructors or instance props', () => {
    @VaultBehavior(META)
    class TestClass {
      value = 123;
      constructor() {}
    }

    expect((TestClass as any)[BEHAVIOR_META]).toBe(META);
    expect(new TestClass().value).toBe(123);
  });

  it('should leave prototype and instance fields untouched', () => {
    @VaultBehavior(META)
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
      type: BehaviorTypes.Operator,
      key: 'op',
      critical: false,
      random: 123,
      another: 'hello'
    };

    expect(() => {
      @VaultBehavior(weirdMeta)
      // eslint-disable-next-line
      class WeirdClass {}
    }).not.toThrow();
  });

  it('should correctly assign undefined metadata without errors', () => {
    const meta: BehaviorMetaShape = {
      type: undefined as any,
      key: 'something',
      critical: undefined as any
    };

    @VaultBehavior(meta)
    class TestClass {}

    expect((TestClass as any)[BEHAVIOR_META]).toEqual(meta);
    expect((TestClass as any).type).toBeUndefined();
    expect((TestClass as any).key).toBe('something');
    expect((TestClass as any).critical).toBeUndefined();
  });

  it('should support decorator applied to abstract classes', () => {
    @VaultBehavior(META)
    abstract class AbstractClass {}

    expect((AbstractClass as any)[BEHAVIOR_META]).toEqual(META);
    expect((AbstractClass as any).type).toBe(META.type);
  });

  it('should not mutate the metadata object passed into the decorator', () => {
    const metaCopy = { ...META };

    @VaultBehavior(metaCopy)
    // eslint-disable-next-line
    class TestClass {}

    // If mutated, they wouldn't match
    expect(metaCopy).toEqual(META);
  });
});
