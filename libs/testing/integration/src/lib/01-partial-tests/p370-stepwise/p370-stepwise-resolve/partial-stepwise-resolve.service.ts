import { Injectable } from '@angular/core';
import {
  StepwiseBehaviorDecisionShape,
  StepwiseBehaviorOptions
} from '@sdux-vault/addons';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { BankEmployeeShape } from '../../../structure/shapes/bank-employee.shape';
import { PartialStepwiseAbstractClass } from '../partial-stepwise.abstract';
import { partialStepwisePureFunction } from '../partial-stepwise.pure-functions';

@FeatureCell<BankEmployeeShape[]>('partial-stepwise-resolve')
@Injectable({
  providedIn: 'root'
})
export class PartialStepwiseResolveService extends PartialStepwiseAbstractClass<
  BankEmployeeShape[]
> {
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialStepwiseResolveService));
  }

  async initializeArrowMethod(): Promise<void> {
    await this.vault.withStepwiseResolve!({
      stepwiseCallback: this.partialStepwiseArrowMethod
    } as StepwiseBehaviorOptions<BankEmployeeShape[]>).initialize();
  }

  async initializeArrowMethodError(): Promise<void> {
    await this.vault.withStepwiseResolve!({
      stepwiseCallback: this.partialStepwiseArrowMethodError
    } as StepwiseBehaviorOptions<BankEmployeeShape[]>).initialize();
  }

  async initializeBoundMethod(): Promise<void> {
    await this.vault.withStepwiseResolve!({
      stepwiseCallback: this.partialStepwiseBoundMethod.bind(this)
    } as StepwiseBehaviorOptions<BankEmployeeShape[]>).initialize();
  }

  async initializeInlineMethod(): Promise<void> {
    await this.vault.withStepwiseResolve!({
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
    await this.vault.withStepwiseResolve!({
      stepwiseCallback: partialStepwisePureFunction
    } as StepwiseBehaviorOptions<BankEmployeeShape[]>).initialize();
  }
}
