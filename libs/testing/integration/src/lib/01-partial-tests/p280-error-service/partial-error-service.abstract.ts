import { FeatureCellShape } from '@sdux-vault/angular';
import {
  StateSnapshotShape,
  VaultErrorCallback,
  VaultErrorShape
} from '@sdux-vault/shared';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';

/**
 * partialErrorCallbackAbstractClass
 */
export class PartialErrorServiceAbstractClass<
  T
> extends PrimaryPartialAbstractClass<T> {
  /**
   * The errors to track the error callbacks
   */
  public errors: string[] = [];
  /**
   * constructior
   * @param vault The Feature cell
   */
  constructor(vault: FeatureCellShape<T>) {
    super(vault);
  }

  /**
   * Removes all collected error entries.
   */
  clearErrors(): void {
    this.errors.length = 0;
  }

  /**
   * Returns all collected error events as strings.
   *
   * @returns An array of string captured from error callback execution.
   */
  getErrors(): string[] {
    return this.errors;
  }

  transformError(state: StateSnapshotShape<T>): string {
    // eslint-disable-next-line
    state.error = 'this is a normalized error string for testing' as any;

    return JSON.stringify(state);
  }

  transformStateError(state: StateSnapshotShape<T>): void {
    this.errors.push(this.transformError(state));
  }

  /**
   * Arrow ErrorCallback (#1)
   */
  readonly partialArrowErrorCallback: VaultErrorCallback<T> = (
    error: VaultErrorShape,
    state: StateSnapshotShape<T>
  ): void => {
    this.errors.push(`arrow-${error.message}`);

    if (state.error) {
      delete state.error.raw;
    }

    this.transformStateError(state);
  };

  /**
   * Bound class errorCallback (#3)
   */
  public partialBoundErrorCallback(
    error: VaultErrorShape,
    state: Readonly<StateSnapshotShape<T>>
  ): void {
    this.errors.push(`bound-${error.message}`);
    this.transformStateError(state);
  }

  /**
   * Private helper used by the nested/bound error callback variant.
   *
   */
  #partialPrivateErrorCallback(
    error: VaultErrorShape,
    state: Readonly<StateSnapshotShape<T>>
  ): void {
    this.errors.push(`private-${error.message}`);
    this.transformStateError(state);
  }

  /**
   * Bound (#3)
   *
   * Demonstrates a ErrorCallbackCallbak<T> that calls into a private helper.
   * This validates that nested and bound error callback functions execute correctly
   * and preserve the expected execution context.
   *
   */
  public partialNestedErrorCallback(
    error: VaultErrorShape,
    state: Readonly<StateSnapshotShape<T>>
  ): void {
    this.#partialPrivateErrorCallback(error, state);
  }
}
