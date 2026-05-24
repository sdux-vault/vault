import { InjectionToken } from '@angular/core';
import { StageDefinitionShape } from '../shapes/stage-definition.shape';

export const PIPELINE_BUILDER_STAGE_TOKEN = new InjectionToken<
  StageDefinitionShape[]
>('PIPELINE_BUILDER_STAGES');
