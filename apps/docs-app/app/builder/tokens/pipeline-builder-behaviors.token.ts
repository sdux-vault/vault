import { InjectionToken } from '@angular/core';
import { BehaviorDefinitionShape } from '../shapes/behavior-definition.shape';

export const PIPELINE_BUILDER_BEHAVIOR_TOKEN = new InjectionToken<
  BehaviorDefinitionShape[]
>('PIPELINE_BUILDER_BEHAVIORS');
