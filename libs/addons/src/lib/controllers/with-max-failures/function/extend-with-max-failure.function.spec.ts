import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { extendWithMaxFailureFluent } from './extend-with-max-failure.function';

describe('Function: extendWithMaxFailureFluent', () => {
  let cell: FeatureCellBaseShape<any>;

  beforeEach(() => {
    // minimal FeatureCellBaseShapestub
    cell = {
      key: 'test-cell'
    } as unknown as FeatureCellBaseShape<any>;
  });

  it('should attach withMaxFluent methods to the cell', () => {
    extendWithMaxFailureFluent(cell);

    expect(typeof cell.withMaxFailures).toBe('function');
  });

  describe('withMaxFluent', () => {
    it('should throw a clear error when withMaxFluent behavior is not installed', () => {
      extendWithMaxFailureFluent(cell);

      expect(() => {
        cell.withMaxFailures!(Object({}));
      }).toThrowError('[vault] withMaxFailures() controller not installed');
    });
  });
});
