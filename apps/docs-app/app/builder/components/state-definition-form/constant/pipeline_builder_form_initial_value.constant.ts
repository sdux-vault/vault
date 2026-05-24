import {
  StateInitialValueType,
  StateInitialValueTypes
} from 'apps/docs-app/app/builder/types/state-initial-value.type';
import {
  StatePrimitiveType,
  StatePrimitiveTypes
} from 'apps/docs-app/app/builder/types/state-primitive.type';

export interface InitialValueOption {
  value: StateInitialValueType;
  label: string;
}

export const PIPELINE_BUILDER_FORM_INITIAL_VALUE_CONSTANT: Record<
  StatePrimitiveType,
  InitialValueOption[]
> = {
  [StatePrimitiveTypes.Array]: [
    { value: StateInitialValueTypes.EmptyArray, label: 'Empty Array' },
    {
      value: StateInitialValueTypes.Deferred,
      label: 'Deferred Promise or Method'
    },
    { value: StateInitialValueTypes.Null, label: 'Null' },
    { value: StateInitialValueTypes.Undefined, label: 'Undefined' }
    //{ value: StateInitialValueTypes.Custom, label: 'Custom' }
  ],

  [StatePrimitiveTypes.Object]: [
    { value: StateInitialValueTypes.EmptyObject, label: 'Empty Object' },
    {
      value: StateInitialValueTypes.Deferred,
      label: 'Deferred Promise or Method'
    },
    { value: StateInitialValueTypes.Null, label: 'Null' },
    { value: StateInitialValueTypes.Undefined, label: 'Undefined' }
    //{ value: StateInitialValueTypes.Custom, label: 'Custom' }
  ],

  [StatePrimitiveTypes.String]: [
    { value: StateInitialValueTypes.String, label: 'Empty String' },
    {
      value: StateInitialValueTypes.Deferred,
      label: 'Deferred Promise or Method'
    },
    { value: StateInitialValueTypes.Null, label: 'Null' },
    { value: StateInitialValueTypes.Undefined, label: 'Undefined' }
    // { value: StateInitialValueTypes.Custom, label: 'Custom' }
  ],

  [StatePrimitiveTypes.Number]: [
    { value: StateInitialValueTypes.Number, label: 'Zero' },
    {
      value: StateInitialValueTypes.Deferred,
      label: 'Deferred Promise or Method'
    },
    { value: StateInitialValueTypes.Undefined, label: 'Undefined' },
    { value: StateInitialValueTypes.Null, label: 'Null' }
    // { value: StateInitialValueTypes.Custom, label: 'Custom' }
  ],

  [StatePrimitiveTypes.Boolean]: [
    { value: StateInitialValueTypes.True, label: 'True' },
    { value: StateInitialValueTypes.False, label: 'False' },
    {
      value: StateInitialValueTypes.Deferred,
      label: 'Deferred Promise or Method'
    },
    { value: StateInitialValueTypes.Null, label: 'Null' }
    // { value: StateInitialValueTypes.Undefined, label: 'Undefined' }
  ]
};
