import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { extendWithDelayFluent } from './extend-with-delay.function';

describe('Function: extendWithDelay', () => {
  let cell: FeatureCellBaseShape<any>;

  beforeEach(() => {
    // minimal FeatureCellBaseShapestub
    cell = {
      key: 'test-cell'
    } as unknown as FeatureCellBaseShape<any>;
  });

  it('should attach withDelay methods to the cell', () => {
    extendWithDelayFluent(cell);

    expect(typeof cell.withDelay).toBe('function');
  });

  describe('withDelay', () => {
    it('should throw a clear error when withDelay behavior is not installed', () => {
      extendWithDelayFluent(cell);

      expect(() => {
        cell.withDelay!(Object({}));
      }).toThrowError('[vault] withDelay() controller not installed');
    });
  });
});
