import { FeatureCellShape } from '@sdux-vault/angular';
import { CoreEmitStateCallback, StateSnapshotShape } from '@sdux-vault/shared';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';

export class PartialStateWithCallbacksAbstractClass<
  T
> extends PrimaryPartialAbstractClass<T> {
  /**
   * The states to track the state callbacks
   */
  public states: string[] = [];
  /**
   * constructior
   * @param vault The Feature cell
   */
  constructor(vault: FeatureCellShape<T>) {
    super(vault);
  }

  /**
   * Removes all collected state entries.
   */
  clearStates(): void {
    this.states.length = 0;
  }

  /**
   * Returns all collected state events as strings.
   *
   * @returns An array of string captured from state callback execution.
   */
  getStates(): string[] {
    return this.states;
  }

  /**
   * Arrow StateCallback (#1)
   */
  readonly partialArrowEmitStateCallback: CoreEmitStateCallback<T> = (
    state: Readonly<StateSnapshotShape<T>>
  ): void => {
    this.states.push(`arrow-${state.hasValue}`);
    //eslint-disable-next-line
    this.states.push(JSON.stringify((state as any)?.value?.[0]));
  };

  /**
   * Bound class stateCallback (#3)
   */
  public partialBoundEmitStateCallback(
    state: Readonly<StateSnapshotShape<T>>
  ): void {
    this.states.push(`bound-${state.hasValue}`);
    //eslint-disable-next-line
    this.states.push(JSON.stringify((state as any)?.value?.[0]));
  }

  /**
   * Private helper used by the nested/bound state callback variant.
   *
   */
  #partialPrivateEmitStateCallback(
    state: Readonly<StateSnapshotShape<T>>
  ): void {
    this.states.push(`private-${state.hasValue}`);
    //eslint-disable-next-line
    this.states.push(JSON.stringify((state as any)?.value?.[0]));
  }

  /**
   * Bound (#3)
   *
   * Demonstrates a StateCallback<T> that calls into a private helper.
   * This validates that nested and bound state callback functions execute correctly
   * and preserve the expected execution context.
   *
   */
  public partialNestedEmitStateCallback(
    state: Readonly<StateSnapshotShape<T>>
  ): void {
    this.#partialPrivateEmitStateCallback(state);
  }
}
