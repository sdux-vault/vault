import { Injectable } from '@angular/core';
import {
  StepwiseBehaviorDecisionShape,
  StepwiseBehaviorOptions
} from '@sdux-vault/addons';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { BankEmployeeShape } from '../../../structure/shapes/bank-employee.shape';
import { PartialStepwiseAbstractClass } from '../partial-stepwise.abstract';
import { partialStepwisePureFunction } from '../partial-stepwise.pure-functions';

@FeatureCell<BankEmployeeShape[]>('partial-stepwise-reducer')
@Injectable({
  providedIn: 'root'
})
export class PartialStepwiseReducerService extends PartialStepwiseAbstractClass<
  BankEmployeeShape[]
> {
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialStepwiseReducerService));
  }

  async initializeArrowMethod(): Promise<void> {
    await this.vault.withStepwiseReducer!({
      stepwiseCallback: this.partialStepwiseArrowMethod
    } as StepwiseBehaviorOptions<BankEmployeeShape[]>).initialize();
  }

  async initializeArrowMethodError(): Promise<void> {
    await this.vault.withStepwiseReducer!({
      stepwiseCallback: this.partialStepwiseArrowMethodError
    } as StepwiseBehaviorOptions<BankEmployeeShape[]>).initialize();
  }

  async initializeBoundMethod(): Promise<void> {
    await this.vault.withStepwiseReducer!({
      stepwiseCallback: this.partialStepwiseBoundMethod.bind(this)
    } as StepwiseBehaviorOptions<BankEmployeeShape[]>).initialize();
  }

  async initializeInlineMethod(): Promise<void> {
    await this.vault.withStepwiseReducer!({
      stepwiseCallback: (
        _current: BankEmployeeShape[],
        _candidate: BankEmployeeShape[],
        decisions: StepwiseBehaviorDecisionShape
      ): void => {
        decisions.continue();
      }
    } as StepwiseBehaviorOptions<BankEmployeeShape[]>).initialize();
  }

  async initializePureFunction(): Promise<void> {
    await this.vault.withStepwiseReducer!({
      stepwiseCallback: partialStepwisePureFunction
    } as StepwiseBehaviorOptions<BankEmployeeShape[]>).initialize();
  }
}
