import { VAULT_METADATA_KEYS } from '../constants/metadata-keys.constant';
import { FeatureCell } from './feature-cell.decorator';

describe('Decorator: FeatureCell', () => {
  const KEY = VAULT_METADATA_KEYS.FEATURE_CELL_KEY;
  const STATE = VAULT_METADATA_KEYS.FEATURE_CELL_STATE;

  beforeEach(() => {
    // No global state – nothing to reset
  });

  // -----------------------------------------------------------
  // 1. Metadata assignment
  // -----------------------------------------------------------
  it('should assign FEATURE_CELL_KEY metadata to the class', () => {
    @FeatureCell<any>('myCell')
    class TestService {}

    expect((TestService as any)[KEY]).toBe('myCell');
  });

  it('should assign FEATURE_CELL_STATE type anchor to the class', () => {
    interface MyState {
      value: string;
    }

    @FeatureCell<MyState>('cell')
    class TestService {}

    const stored = (TestService as any)[STATE];

    // The anchor is always "null as TState"
    expect(stored).toBeNull();
  });

  // -----------------------------------------------------------
  // 2. Multiple decorated classes should not interfere
  // -----------------------------------------------------------
  it('should isolate metadata between different decorated classes', () => {
    @FeatureCell<string>('cellA')
    class A {}

    @FeatureCell<number>('cellB')
    class B {}

    expect((A as any)[KEY]).toBe('cellA');
    expect((B as any)[KEY]).toBe('cellB');

    expect((A as any)[STATE]).toBeNull();
    expect((B as any)[STATE]).toBeNull();
  });

  // -----------------------------------------------------------
  // 3. Decorator should not modify prototype or instance
  // -----------------------------------------------------------
  it('should NOT assign metadata on the prototype or instance', () => {
    @FeatureCell<any>('protoTest')
    class Test {}

    const instance = new Test();

    expect((instance as any)[KEY]).toBeUndefined();
    expect((instance as any)[STATE]).toBeUndefined();

    expect((Test.prototype as any)[KEY]).toBeUndefined();
    expect((Test.prototype as any)[STATE]).toBeUndefined();
  });

  // -----------------------------------------------------------
  // 4. Should work with constructor arguments
  // -----------------------------------------------------------
  it('should allow decorated classes with constructor parameters', () => {
    @FeatureCell<{ count: number }>('args')
    class WithArgs {
      constructor(
        public x: number,
        public y: string
      ) {}
    }

    expect((WithArgs as any)[KEY]).toBe('args');
    expect((WithArgs as any)[STATE]).toBeNull();

    const inst = new WithArgs(10, 'abc');
    expect(inst.x).toBe(10);
    expect(inst.y).toBe('abc');
  });

  // -----------------------------------------------------------
  // 5. Should handle generic TState correctly (type anchor only)
  // -----------------------------------------------------------
  it('should set a null type anchor for inferred generic TState', () => {
    type ComplexState = { a: number; b: string[] };

    @FeatureCell<ComplexState>('complex')
    class Complex {}

    const anchor = (Complex as any)[STATE];
    expect(anchor).toBeNull(); // always null, but typed
  });

  // -----------------------------------------------------------
  // 6. Should overwrite previous metadata if decorator applied twice
  // -----------------------------------------------------------
  it('should overwrite metadata if the decorator is applied again', () => {
    @FeatureCell<any>('first')
    @FeatureCell<any>('second')
    class DoubleDecorated {}

    expect((DoubleDecorated as any)[KEY]).toBe('first');
  });

  // -----------------------------------------------------------
  // 7. Should not throw when decorating abstract classes
  // -----------------------------------------------------------
  it('should support abstract classes', () => {
    abstract class Base {}

    @FeatureCell<any>('abstract')
    class Concrete extends Base {}

    expect((Concrete as any)[KEY]).toBe('abstract');
  });

  // -----------------------------------------------------------
  // 8. Should support inheritance without leaking metadata
  // -----------------------------------------------------------
  it('should NOT copy FeatureCell metadata to subclasses automatically', () => {
    @FeatureCell<any>('parent')
    class Parent {}

    class Child extends Parent {}

    expect((Parent as any)[KEY]).toBe('parent');

    // subclass inherits but does not define its own metadata
    expect(Object.prototype.hasOwnProperty.call(Child, KEY)).toBeFalse();
  });

  // -----------------------------------------------------------
  // 9. FeatureCell metadata should be configurable per subclass
  // -----------------------------------------------------------
  it('should support re-decorating subclasses independently', () => {
    @FeatureCell<any>('root')
    class Root {}

    @FeatureCell<any>('child')
    class Child extends Root {}

    expect((Root as any)[KEY]).toBe('root');
    expect((Child as any)[KEY]).toBe('child');
  });

  // -----------------------------------------------------------
  // 10. Should attach both metadata properties
  // -----------------------------------------------------------
  it('should define both FEATURE_CELL_KEY and FEATURE_CELL_STATE', () => {
    @FeatureCell<{ foo: string }>('cellXYZ')
    class Test {}

    const ctor: any = Test;

    expect(ctor[KEY]).toBe('cellXYZ');
    expect(ctor[STATE]).toBeNull();
  });
});
