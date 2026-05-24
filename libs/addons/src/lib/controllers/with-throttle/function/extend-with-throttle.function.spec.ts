import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { extendWithThrottleFluent } from './extend-with-throttle.function';

describe('Function: extendWithThrottle', () => {
  let cell: FeatureCellBaseShape<any>;

  beforeEach(() => {
    // minimal FeatureCellBaseShapestub
    cell = {
      key: 'test-cell'
    } as unknown as FeatureCellBaseShape<any>;
  });

  it('should attach withThrottle methods to the cell', () => {
    extendWithThrottleFluent(cell);

    expect(typeof cell.withThrottle).toBe('function');
  });

  describe('withThrottle', () => {
    it('should throw a clear error when withThrottle behavior is not installed', () => {
      extendWithThrottleFluent(cell);

      expect(() => {
        cell.withThrottle!(Object({}));
      }).toThrowError('[vault] withThrottle() controller not installed');
    });
  });
});
