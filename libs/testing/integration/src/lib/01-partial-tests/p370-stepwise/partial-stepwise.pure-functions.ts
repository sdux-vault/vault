import { StepwiseBehaviorDecisionShape } from '@sdux-vault/addons';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

export function partialStepwisePureFunction(
  _current: BankEmployeeShape[],
  _candidate: BankEmployeeShape[],
  decisions: StepwiseBehaviorDecisionShape
): void {
  decisions.continue();
}
