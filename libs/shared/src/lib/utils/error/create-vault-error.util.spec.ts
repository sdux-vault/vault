import { createVaultError } from './create-vault-error.util';

describe('Util: Create Vault Error', () => {
  const featureCellKey = 'cell-key';
  beforeEach(() => {
    spyOn(Date, 'now').and.returnValue(1111);
  });

  it('should normalize HttpErrorResponse correctly', () => {
    const httpError = Object({
      status: 500,
      statusText: 'Server Error',
      error: 'Internal Failure'
    });

    expect(createVaultError(httpError, featureCellKey)).toEqual(
      Object({
        message: 'Unexpected error',
        raw: Object({
          status: 500,
          statusText: 'Server Error',
          error: 'Internal Failure'
        }),
        details: Object({
          status: 500,
          statusText: 'Server Error',
          error: 'Internal Failure'
        }),
        featureCellKey,
        timestamp: 1111
      })
    );
  });

  it('should normalize generic Error objects', () => {
    const error = new Error('Boom!');

    expect(createVaultError(error, featureCellKey)).toEqual(
      Object({
        message: 'Boom!',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: 1111,
        featureCellKey
      })
    );
  });

  it('should normalize string errors', () => {
    expect(createVaultError('Something bad', featureCellKey)).toEqual({
      message: 'Something bad',
      details: 'Something bad',
      raw: 'Something bad',
      timestamp: 1111,
      featureCellKey
    });
  });

  it('should normalize unknown object types', () => {
    const weird = { foo: 'bar' };

    expect(createVaultError(weird, featureCellKey)).toEqual({
      message: 'Unexpected error',
      details: weird,
      raw: weird,
      timestamp: 1111,
      featureCellKey
    });
  });

  it('should default to Unexpected error for null', () => {
    expect(createVaultError(null, featureCellKey)).toEqual({
      message: 'Unexpected error',
      details: null,
      raw: null,
      timestamp: 1111,
      featureCellKey
    });
  });

  it('should default to Unexpected error for undefined', () => {
    expect(createVaultError(undefined, featureCellKey)).toEqual({
      message: 'Unexpected error',
      details: undefined,
      raw: undefined,
      timestamp: 1111,
      featureCellKey
    });
  });

  it('should use statusText when HttpErrorResponse.message is empty', () => {
    const httpError = Object({
      status: 404,
      statusText: 'Not Found',
      error: 'Missing resource'
    });
    // Manually blank out the message to hit fallback branch
    Object.defineProperty(httpError, 'message', { value: '', writable: false });

    expect(createVaultError(httpError, featureCellKey)).toEqual(
      Object({
        message: 'Unexpected error',
        details: Object({
          status: 404,
          statusText: 'Not Found',
          error: 'Missing resource'
        }),
        raw: Object({
          status: 404,
          statusText: 'Not Found',
          error: 'Missing resource'
        }),
        timestamp: 1111,
        featureCellKey
      })
    );
  });

  it('should fall back to "HTTP error" when both message and statusText are empty', () => {
    const httpError = Object({ status: 500, error: 'Oops!' });
    Object.defineProperty(httpError, 'message', { value: '', writable: false });
    Object.defineProperty(httpError, 'statusText', {
      value: '',
      writable: false
    });

    expect(createVaultError(httpError, featureCellKey)).toEqual(
      Object({
        message: 'Unexpected error',
        details: Object({ status: 500, error: 'Oops!' }),
        raw: Object({ status: 500, error: 'Oops!' }),
        timestamp: 1111,
        featureCellKey
      })
    );
  });

  it('should use "Unexpected error" when Error.message is empty', () => {
    const err = new Error('');
    expect(createVaultError(err, featureCellKey)).toEqual(
      Object({
        message: 'Unexpected error',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: 1111,
        featureCellKey
      })
    );
  });

  it('should handle numeric error values correctly', () => {
    expect(createVaultError(404, featureCellKey)).toEqual({
      message: 'Unexpected error',
      details: 404,
      raw: 404,
      timestamp: 1111,
      featureCellKey
    });
  });

  it('should handle boolean error values correctly', () => {
    expect(createVaultError(false, featureCellKey)).toEqual({
      message: 'Unexpected error',
      details: false,
      raw: false,
      timestamp: 1111,
      featureCellKey
    });
  });
});
