import { Observable } from 'rxjs';
import { VAULT_CLEAR_STATE } from '../../constants/vault/vault-clear-state.constant';
import { VAULT_CONTINUE } from '../../constants/vault/vault-continue.constant';
import { VAULT_NOOP } from '../../constants/vault/vault-noop.constant';
import {
  isDefined,
  isFunction,
  isNull,
  isNullish,
  isObject,
  isStateInputShape,
  isUndefined,
  isVaultClearState,
  isVaultContinue,
  isVaultNoop
} from './logic.utils';

describe('Utils: Logic Functions', () => {
  // -------------------------------
  // NOOP
  // -------------------------------

  describe('isVaultContinue', () => {
    it('isVaultContinue should detect VAULT_CONTINUE', () => {
      expect(isVaultContinue(VAULT_CONTINUE)).toBeTrue();
    });

    it('isVaultContinue should return false for others', () => {
      expect(isVaultContinue('x' as any)).toBeFalse();
    });
  });

  describe('isVaultClearState', () => {
    it('isVaultClearState should detect VAULT_CLEAR_STATE', () => {
      expect(isVaultClearState(VAULT_CLEAR_STATE)).toBeTrue();
    });

    it('isVaultClearState should return false for others', () => {
      expect(isVaultClearState('x' as any)).toBeFalse();
    });
  });

  describe('isVaultNoop', () => {
    it('isVaultNoop should detect VAULT_NOOP', () => {
      expect(isVaultNoop(VAULT_NOOP)).toBeTrue();
    });

    it('isVaultNoop should return false for others', () => {
      expect(isVaultNoop('x' as any)).toBeFalse();
    });
  });

  // -------------------------------
  // NULL / UNDEFINED CHECKS
  // -------------------------------

  it('isNull should detect null', () => {
    expect(isNull(null)).toBeTrue();
    expect(isNull(undefined)).toBeFalse();
  });

  it('isUndefined should detect undefined', () => {
    expect(isUndefined(undefined)).toBeTrue();
    expect(isUndefined(null)).toBeFalse();
  });

  it('isDefined should detect non-undefined', () => {
    expect(isDefined('x')).toBeTrue();
    expect(isDefined(null)).toBeTrue(); // intentional contract
    expect(isDefined(undefined)).toBeFalse();
  });

  it('isNullish should detect null or undefined', () => {
    expect(isNullish(null)).toBeTrue();
    expect(isNullish(undefined)).toBeTrue();
    expect(isNullish('x')).toBeFalse();
    expect(isNullish(0)).toBeFalse();
    expect(isNullish(false)).toBeFalse();
  });

  // -------------------------------
  // FUNCTION
  // -------------------------------

  describe('isFunction', () => {
    it('should return false for null and undefined', () => {
      expect(isFunction(null)).toBeFalse();
      expect(isFunction(undefined)).toBeFalse();
    });

    it('should return false for primitive values', () => {
      expect(isFunction('x')).toBeFalse();
      expect(isFunction(0)).toBeFalse();
      expect(isFunction(false)).toBeFalse();
      expect(isFunction(Symbol('s'))).toBeFalse();
    });

    it('should detect an arrow function', () => {
      expect(isFunction(() => {})).toBeTrue();
    });

    it('should detect a function declaration', () => {
      function fn() {}
      expect(isFunction(fn)).toBeTrue();
    });

    it('should detect an async function', () => {
      const fn = async () => 123;
      expect(isFunction(fn)).toBeTrue();
    });

    it('should detect a class constructor as a function', () => {
      class Test {}
      expect(isFunction(Test)).toBeTrue();
    });

    it('should detect a function with properties', () => {
      const fn: any = () => {};
      fn.extra = true;
      expect(isFunction(fn)).toBeTrue();
    });

    it('should return false for callable-like objects', () => {
      const fakeFn = { call() {}, apply() {} };
      expect(isFunction(fakeFn)).toBeFalse();
    });
  });

  describe('isStateInputShape', () => {
    describe('true validation', () => {
      it('should return true for empty objects', () => {
        expect(isStateInputShape({})).toBeTrue();
      });

      it('should return true when object contains "loading"', () => {
        expect(isStateInputShape({ loading: true })).toBeTrue();
        expect(isStateInputShape({ loading: false })).toBeTrue();
      });

      it('should return true when object contains "value"', () => {
        expect(isStateInputShape({ value: 123 })).toBeTrue();
        expect(isStateInputShape({ value: null })).toBeTrue();
        expect(isStateInputShape({ value: undefined })).toBeTrue();
      });

      it('should return true when object contains "error"', () => {
        expect(isStateInputShape({ error: new Error('fail') })).toBeTrue();
        expect(isStateInputShape({ error: 'something went wrong' })).toBeTrue();
      });

      it('should return true when object contains multiple known keys', () => {
        expect(
          isStateInputShape({
            loading: true,
            value: 42,
            error: null
          })
        ).toBeTrue();
      });

      it('should return true even if known key value is undefined', () => {
        expect(isStateInputShape({ loading: undefined })).toBeTrue();
        expect(isStateInputShape({ value: undefined })).toBeTrue();
        expect(isStateInputShape({ error: undefined })).toBeTrue();
      });

      it('should return true for Object.create(null) empty object', () => {
        const obj = Object.create(null);
        expect(isStateInputShape(obj)).toBeTrue();
      });

      it('should treat empty plain object as valid state input', () => {
        const obj = {};
        expect(isStateInputShape(obj)).toBeTrue();
      });
    });

    describe('false validation', () => {
      describe('prototype handling', () => {
        it('should return false for objects with custom prototype even if known key exists as own property', () => {
          const proto = { value: 999 };
          const obj = Object.create(proto);
          obj.value = 123;

          expect(isStateInputShape(obj)).toBeFalse();
        });

        it('should return false when known keys exist only on the prototype chain', () => {
          const proto = { value: 123 };
          const obj = Object.create(proto);

          expect(isStateInputShape(obj)).toBeFalse();
        });

        it('should return false for objects with custom prototype containing "loading"', () => {
          const proto = { loading: true };
          const obj = Object.create(proto);

          expect(isStateInputShape(obj)).toBeFalse();
        });

        it('should return false for objects with custom prototype containing "error"', () => {
          const proto = { error: undefined };
          const obj = Object.create(proto);

          expect(isStateInputShape(obj)).toBeFalse();
        });
      });

      it('should return false for class instances', () => {
        class Foo {}
        expect(isStateInputShape(new Foo())).toBeFalse();
      });

      it('should return false for Set', () => {
        expect(isStateInputShape(new Set())).toBeFalse();
      });

      it('should return false for WeakMap', () => {
        expect(isStateInputShape(new WeakMap())).toBeFalse();
      });

      it('should return false for WeakSet', () => {
        expect(isStateInputShape(new WeakSet())).toBeFalse();
      });

      it('should return false for null and undefined', () => {
        expect(isStateInputShape(null)).toBeFalse();
        expect(isStateInputShape(undefined)).toBeFalse();
      });

      it('should return false for primitive values', () => {
        expect(isStateInputShape('x')).toBeFalse();
        expect(isStateInputShape(0)).toBeFalse();
        expect(isStateInputShape(false)).toBeFalse();
        expect(isStateInputShape(Symbol('s'))).toBeFalse();
        expect(isStateInputShape(123n)).toBeFalse();
      });

      it('should return false for arrays', () => {
        expect(isStateInputShape([])).toBeFalse();
        expect(isStateInputShape([1, 2, 3])).toBeFalse();
      });

      it('should return false for objects that do not contain known keys', () => {
        expect(isStateInputShape({ foo: 'bar' })).toBeFalse();
        expect(isStateInputShape({ data: 123 })).toBeFalse();
        expect(isStateInputShape({ state: true })).toBeFalse();
      });

      it('should handle generic typing correctly at compile time', () => {
        const shape = { value: 42 };

        if (isStateInputShape<number>(shape)) {
          // Type narrowing should occur here
          const val: number | undefined | null = shape.value;
          expect(val).toBe(42);
        } else {
          fail('Expected shape to be recognized as StateInputShape<number>');
        }
      });

      it('should not falsely detect function values as StateInputShape', () => {
        const fn = () => {};
        expect(isStateInputShape(fn)).toBeFalse();
      });

      it('should not falsely detect Date objects', () => {
        expect(isStateInputShape(new Date())).toBeFalse();
      });

      it('should not falsely detect Map objects', () => {
        expect(isStateInputShape(new Map())).toBeFalse();
      });

      it('should return false for Observable', () => {
        expect(isStateInputShape(new Observable())).toBeFalse();
      });

      it('should not falsely detect Promise objects', () => {
        expect(isStateInputShape(Promise.resolve(undefined))).toBeFalse();
      });

      it('should return false for Object.create(null) with unknown keys', () => {
        const obj = Object.create(null);
        obj.foo = 'bar';

        expect(isStateInputShape(obj)).toBeFalse();
      });
    });
  });

  // -------------------------------
  // FUNCTION
  // -------------------------------

  describe('isObject', () => {
    it('should return false for null and undefined', () => {
      expect(isObject(null)).toBeFalse();
      expect(isObject(undefined)).toBeFalse();
    });

    it('should return false for primitive values', () => {
      expect(isObject('x')).toBeFalse();
      expect(isObject(0)).toBeFalse();
      expect(isObject(false)).toBeFalse();
      expect(isObject(Symbol('s'))).toBeFalse();
      expect(isObject(BigInt(1))).toBeFalse();
    });

    it('should return false for functions', () => {
      expect(isObject(() => {})).toBeFalse();

      function fn() {}
      expect(isObject(fn)).toBeFalse();

      class Test {}
      expect(isObject(Test)).toBeFalse();
    });

    it('should detect plain objects', () => {
      expect(isObject({})).toBeTrue();
      expect(isObject({ a: 1 })).toBeTrue();
    });

    it('should detect objects with a null prototype', () => {
      const obj = Object.create(null);
      expect(isObject(obj)).toBeTrue();
    });

    it('should detect arrays as objects', () => {
      expect(isObject([])).toBeTrue();
      expect(isObject([1, 2, 3])).toBeTrue();
    });

    it('should detect class instances as objects', () => {
      class Test {}
      expect(isObject(new Test())).toBeTrue();
    });

    it('should detect built-in object instances', () => {
      expect(isObject(new Date())).toBeTrue();
      expect(isObject(new Map())).toBeTrue();
      expect(isObject(new Set())).toBeTrue();
      expect(isObject(/regex/)).toBeTrue();
    });
  });
});
