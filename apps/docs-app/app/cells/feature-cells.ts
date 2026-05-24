import { Provider } from '@angular/core';
import {
  withObjectDeepMergeBehavior,
  withSessionStoragePersistBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell } from '@sdux-vault/angular';
import {
  withTabSyncController,
  withTabSyncStateBehavior
} from '@sdux-vault/core';
import { InsightConfig } from '@sdux-vault/shared';
import { PipelineBuilderService } from '../builder/services/pipeline-builder.service';

export const PipelineProvideFeatureCell = provideFeatureCell(
  PipelineBuilderService,
  {
    key: 'pipeline-builder',
    initialState: {},
    insights: {
      wantsErrors: true,
      wantsPayload: true,
      wantsState: false
    } as InsightConfig
  },
  [
    withObjectDeepMergeBehavior,
    withSessionStoragePersistBehavior,
    withTabSyncStateBehavior
  ],
  [withTabSyncController]
);

export const FeatureCellInvocations: Provider[] = [PipelineProvideFeatureCell];
