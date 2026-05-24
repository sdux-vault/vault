import { InjectionToken } from '@angular/core';
import { DevMode } from '@sdux-vault/shared';
import { FeatureCellShape } from '../shapes/feature-cell.shape';
import {
  createAngularFeatureCellToken,
  resetAngularFeatureCellTokenDevMode
} from './feature-cell-di.token';

describe('createAngularFeatureCellToken', () => {
  describe('devMode active', () => {
    beforeEach(() => {
      spyOnProperty(DevMode, 'active', 'get').and.returnValue(true);
    });

    afterEach(() => {
      resetAngularFeatureCellTokenDevMode();
    });

    it('should create a new InjectionToken for a given key', () => {
      const token = createAngularFeatureCellToken('test-injection');

      expect(token).toBeDefined();
      expect(token instanceof InjectionToken).toBeTrue();
    });

    it('should return the same token instance for the same key', () => {
      expect(createAngularFeatureCellToken('test-same-key')).toEqual(
        createAngularFeatureCellToken('test-same-key')
      );
    });

    it('should create different token instances for different keys', () => {
      const tokenA = createAngularFeatureCellToken('cellA');
      const tokenB = createAngularFeatureCellToken('cellB');

      expect(tokenA).not.toBe(tokenB);
    });

    it('should embed the key in the InjectionToken description', () => {
      const key = 'myFeatureCell';
      const token = createAngularFeatureCellToken(key);

      // Angular stores the description on `toString()`
      expect(token.toString()).toContain(`FEATURE_CELL:${key}`);
    });

    it('should be usable as a typed FeatureCellModel InjectionToken', () => {
      const token = createAngularFeatureCellToken<number>('typedCell');

      // Compile-time type assertion (runtime no-op)
      const typedToken: InjectionToken<FeatureCellShape<number>> = token;

      expect(typedToken).toBe(token);
    });
  });

  describe('devMode inactive', () => {
    beforeEach(() => {
      spyOnProperty(DevMode, 'active', 'get').and.returnValue(false);
    });

    afterEach(() => {
      resetAngularFeatureCellTokenDevMode();
    });

    it('should create a new InjectionToken for a given key', () => {
      const token = createAngularFeatureCellToken('test-injection');

      expect(token).toBeDefined();
      expect(token instanceof InjectionToken).toBeTrue();
    });

    it('should throw an error on the same token instance for the same key', () => {
      createAngularFeatureCellToken('test-same-key');
      expect(() => createAngularFeatureCellToken('test-same-key')).toThrowError(
        '[vault] Duplicate FeatureCell key detected: "test-same-key". Each FeatureCell must have a unique key. Existing token: "test-same-key"'
      );
    });

    it('should create different token instances for different keys', () => {
      const tokenA = createAngularFeatureCellToken('cellA');
      const tokenB = createAngularFeatureCellToken('cellB');

      expect(tokenA).not.toBe(tokenB);
    });

    it('should embed the key in the InjectionToken description', () => {
      const key = 'myFeatureCell';
      const token = createAngularFeatureCellToken(key);

      // Angular stores the description on `toString()`
      expect(token.toString()).toContain(`FEATURE_CELL:${key}`);
    });

    it('should be usable as a typed FeatureCellModel InjectionToken', () => {
      const token = createAngularFeatureCellToken<number>('typedCell');

      // Compile-time type assertion (runtime no-op)
      const typedToken: InjectionToken<FeatureCellShape<number>> = token;

      expect(typedToken).toBe(token);
    });
  });
});
