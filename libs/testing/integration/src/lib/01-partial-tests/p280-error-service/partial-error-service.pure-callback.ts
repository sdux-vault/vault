import {
  StateSnapshotShape,
  VaultErrorCallback,
  VaultErrorShape
} from '@sdux-vault/shared';

// eslint-disable-next-line
export const partialPureErrorServiceCallback = <T>(
  errors: string[],
  transform: any
): VaultErrorCallback<T> => {
  return (error: VaultErrorShape, state: Readonly<StateSnapshotShape<T>>) => {
    errors.push(`pure callback-${error.message}`);
    errors.push(transform(state));
  };
};
