import {
  StepwiseBehaviorDecisionShape,
  StepwiseFunction
} from '@sdux-vault/addons';
import { FeatureCellShape } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

export class PartialStepwiseAbstractClass<
  T
> extends PrimaryPartialAbstractClass<T> {
  #decisions: StepwiseBehaviorDecisionShape[] = [];
  #current: (BankEmployeeShape[] | undefined)[] = [];
  #candidate: BankEmployeeShape[][] = [];
  #stage: string[] = [];
  #type: string[] = [];

  /**
   * constructior
   * @param vault The Feature cell
   */
  constructor(vault: FeatureCellShape<T>) {
    super(vault);
  }

  getDecision(): StepwiseBehaviorDecisionShape {
    return this.#decisions.shift()!;
  }

  getCurrent(): BankEmployeeShape[] {
    return this.#current.shift()!;
  }

  getCandidate(): BankEmployeeShape[] {
    return this.#candidate.shift()!;
  }

  getType(): string {
    return this.#type.shift()!;
  }

  getStage(): string {
    return this.#stage.shift()!;
  }

  readonly partialStepwiseArrowMethod: StepwiseFunction<BankEmployeeShape[]> = (
    current: BankEmployeeShape[] | undefined,
    candidate: BankEmployeeShape[],
    decisions: StepwiseBehaviorDecisionShape
  ): void => {
    this.#current.push(current);
    this.#candidate.push(candidate);
    this.#type.push('arrow method');
    this.#stage.push(decisions.stage);
    this.#decisions.push(decisions);
  };

  readonly partialStepwiseArrowMethodError: StepwiseFunction<
    BankEmployeeShape[]
  > = (
    current: BankEmployeeShape[] | undefined,
    candidate: BankEmployeeShape[],
    decisions: StepwiseBehaviorDecisionShape
  ): void => {
    this.#current.push(current);
    this.#candidate.push(candidate);
    this.#type.push('arrow method');
    this.#stage.push(decisions.stage);
    this.#decisions.push(decisions);

    throw new Error(`this is a stepwise-${this.#stage[0]} error`);
  };

  public partialStepwiseBoundMethod(
    current: BankEmployeeShape[],
    candidate: BankEmployeeShape[],
    decisions: StepwiseBehaviorDecisionShape
  ): void {
    this.#current.push(current);
    this.#candidate.push(candidate);
    this.#type.push('bound method');
    this.#stage.push(decisions.stage);
    this.#decisions.push(decisions);
  }
}
