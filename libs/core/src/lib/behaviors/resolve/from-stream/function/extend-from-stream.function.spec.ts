import { FeatureCellShape } from '@sdux-vault/engine';
import { Observable, Subject } from 'rxjs';
import { FromStreamOptions } from '../options/from-stream.options';
import { extendFromStream } from './extend-from-stream.function';

describe('extendFromStream', () => {
  let cell: FeatureCellShape<any>;

  beforeEach(() => {
    cell = {} as FeatureCellShape<any>;
  });

  it('should attach a fromStream method to the cell', () => {
    expect((cell as any).fromStream).toBeUndefined();

    extendFromStream(cell);

    expect(typeof cell.fromStream).toBe('function');
  });

  it('should allow fromStream to be called without throwing', () => {
    extendFromStream(cell);

    const source$ = new Subject<number>();
    const options: FromStreamOptions = { autoResetError: true };

    expect(() => {
      cell.fromStream!(source$, options);
    }).not.toThrow();
  });

  it('should return void when fromStream is called', () => {
    extendFromStream(cell);

    const source$ = new Subject<number>();
    const options: FromStreamOptions = { autoResetError: false };

    const result = cell.fromStream!(source$, options);

    expect(result).toBeUndefined();
  });

  it('should not subscribe to the source observable', () => {
    extendFromStream(cell);

    let subscribed = false;

    const source$ = new Observable(() => {
      subscribed = true;
    });

    cell.fromStream!(source$, { autoResetError: true });

    expect(subscribed).toBeFalse();
  });

  it('should not mutate the FeatureCellModel', () => {
    const originalKeys = Object.keys(cell);

    extendFromStream(cell);

    const afterKeys = Object.keys(cell);

    expect(afterKeys).toEqual(originalKeys.concat(['fromStream']));
  });
});
