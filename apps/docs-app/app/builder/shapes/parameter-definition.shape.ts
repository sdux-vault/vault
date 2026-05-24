import { ParameterType } from '../types/parameter.type';
import { ParameterOptionDefinition } from './parameter-option-definition.shape';

export interface ParameterDefinition {
  key: string;
  label: string;

  type: ParameterType;

  // eslint-disable-next-line
  defaultValue?: any;
  options?: ParameterOptionDefinition[];

  optional?: boolean;

  hint?: string;
  placeholder?: string;

  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
  };
}
