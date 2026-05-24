import { CoreEmitStateCallback, StateSnapshotShape } from '@sdux-vault/shared';

export const partialPureEmitStateWithCallback = <T>(
  states: string[]
): CoreEmitStateCallback<T> => {
  return (state: Readonly<StateSnapshotShape<T>>) => {
    states.push(`pure callback-${state.hasValue}`);
    //eslint-disable-next-line
    states.push(JSON.stringify((state as any)?.value?.[0]));
  };
};
