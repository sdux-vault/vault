import { of } from 'rxjs';
import { extendFromObservable } from './extend-from-observable.function';

describe('Function: extendFromObservable', () => {
  const mockCell = (): any => ({});

  it('should attach fromObservable to the FeatureCell', () => {
    const cell = mockCell();

    expect((cell as any).fromObservable).toBeUndefined();

    extendFromObservable(cell);

    expect(typeof cell.fromObservable).toBe('function');
  });

  it('should return the same Observable instance passed in', (done) => {
    const cell = mockCell();
    extendFromObservable(cell);

    const source$ = of({ value: 123 });

    const result$ = cell.fromObservable!(source$);

    expect(result$).toBe(source$);

    result$.subscribe((val: any) => {
      expect(val).toEqual({ value: 123 });
      done();
    });
  });
});
