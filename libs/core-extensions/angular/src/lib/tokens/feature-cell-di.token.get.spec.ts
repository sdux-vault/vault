import { InjectionToken } from '@angular/core';
import { DevMode } from '@sdux-vault/shared';
import { FeatureCellShape } from '../shapes/feature-cell.shape';
import {
  createAngularFeatureCellToken,
  getAngularFeatureCellToken,
  resetAngularFeatureCellTokenDevMode
} from './feature-cell-di.token';

describe('getAngularFeatureCellToken', () => {
  describe('devMode active', () => {
    beforeEach(() => {
      spyOnProperty(DevMode, 'active', 'get').and.returnValue(true);
    });

    afterEach(() => {
      resetAngularFeatureCellTokenDevMode();
    });

    it('should get a new InjectionToken for a given key', () => {
      createAngularFeatureCellToken('test-injection');
      const token = getAngularFeatureCellToken('test-injection');

      expect(token).toBeDefined();
      expect(token instanceof InjectionToken).toBeTrue();
    });

    it('should throw an error without a created token', () => {
      expect(() => getAngularFeatureCellToken('test-same-key')).toThrowError(
        '[vault] FeatureCell token not found for key "test-same-key". You must call provideFeatureCell() before retrieving this FeatureCell.'
      );
    });

    it('should return the same token instance for the same key', () => {
      createAngularFeatureCellToken('test-same-key');

      expect(getAngularFeatureCellToken('test-same-key')).toEqual(
        getAngularFeatureCellToken('test-same-key')
      );
    });

    it('should get different token instances for different keys', () => {
      createAngularFeatureCellToken('cellA');
      createAngularFeatureCellToken('cellB');

      const tokenA = getAngularFeatureCellToken('cellA');
      const tokenB = getAngularFeatureCellToken('cellB');
      expect(tokenA).not.toBe(tokenB);
    });

    it('should embed the key in the InjectionToken description', () => {
      const key = 'myFeatureCell';
      createAngularFeatureCellToken(key);
      const token = getAngularFeatureCellToken(key);

      // Angular stores the description on `toString()`
      expect(token.toString()).toContain(`FEATURE_CELL:${key}`);
    });

    it('should be usable as a typed FeatureCellModel InjectionToken', () => {
      createAngularFeatureCellToken<number>('typedCell');
      const token = getAngularFeatureCellToken<number>('typedCell');

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

    it('should get a new InjectionToken for a given key', () => {
      createAngularFeatureCellToken('test-injection');
      const token = getAngularFeatureCellToken('test-injection');

      expect(token).toBeDefined();
      expect(token instanceof InjectionToken).toBeTrue();
    });

    it('should throw an error without a created token', () => {
      expect(() => getAngularFeatureCellToken('test-same-key')).toThrowError(
        '[vault] FeatureCell token not found for key "test-same-key". You must call provideFeatureCell() before retrieving this FeatureCell.'
      );
    });

    it('should throw an error on the same token instance for the same key', () => {
      createAngularFeatureCellToken('test-same-key');
      getAngularFeatureCellToken('test-same-key');
      expect(() => getAngularFeatureCellToken('test-same-key')).toThrowError(
        '[vault] FeatureCell "test-same-key" can only be injected into a single decorated @FeatureCell service.'
      );
    });

    it('should get different token instances for different keys', () => {
      createAngularFeatureCellToken('cellA');
      createAngularFeatureCellToken('cellB');

      const tokenA = getAngularFeatureCellToken('cellA');
      const tokenB = getAngularFeatureCellToken('cellB');
      expect(tokenA).not.toBe(tokenB);
    });

    it('should embed the key in the InjectionToken description', () => {
      const key = 'myFeatureCell';
      createAngularFeatureCellToken(key);
      const token = getAngularFeatureCellToken(key);

      // Angular stores the description on `toString()`
      expect(token.toString()).toContain(`FEATURE_CELL:${key}`);
    });

    it('should be usable as a typed FeatureCellModel InjectionToken', () => {
      createAngularFeatureCellToken<number>('typedCell');
      const token = getAngularFeatureCellToken<number>('typedCell');

      // Compile-time type assertion (runtime no-op)
      const typedToken: InjectionToken<FeatureCellShape<number>> = token;

      expect(typedToken).toBe(token);
    });
  });
});
