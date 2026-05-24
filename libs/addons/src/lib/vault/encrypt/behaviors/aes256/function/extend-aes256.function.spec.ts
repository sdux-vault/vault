import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { extendAes256EncryptFunction } from './extend-aes256.function';

describe('extendAes256Encrypt', () => {
  let cell: FeatureCellBaseShape<any>;

  beforeEach(() => {
    // minimal FeatureCellBaseModel stub
    cell = {
      key: 'test-cell'
    } as unknown as FeatureCellBaseShape<any>;
  });

  it('should attach setAes256Secret method to the cell', () => {
    extendAes256EncryptFunction(cell);

    expect(typeof cell.setAes256Secret).toBe('function');
    expect(typeof cell.generateSalt).toBe('function');
  });

  it('should throw an error when withAes256Encrypt behavior is not installed', () => {
    extendAes256EncryptFunction(cell);

    expect(() => {
      cell.setAes256Secret!(Object({}));
    }).toThrowError('[vault] withAes256Encrypt() behavior not installed');
  });

  it('should throw an error when withAes256Encrypt behavior is not installed', () => {
    extendAes256EncryptFunction(cell);

    expect(() => {
      cell.generateSalt!(16);
    }).toThrowError('[vault] withAes256Encrypt() behavior not installed');
  });

  it('should throw an error when withAes256Encrypt behavior is not installed', () => {
    extendAes256EncryptFunction(cell);

    expect(() => {
      cell.generateSalt!(undefined as any);
    }).toThrowError('[vault] withAes256Encrypt() behavior not installed');
  });
});
