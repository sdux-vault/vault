import { inject, Injectable } from '@angular/core';
import { StageInstanceShape } from '../../shapes/stage-instance.shape';
import { StageIdType } from '../../types/id/stage-id.type';
import { StageStatusTypes } from '../../types/stage-status.type';
import { PipelineStepService } from '../pipeline-step.service';

@Injectable({ providedIn: 'root' })
export class NavigationEngineService {
  #pipelineStepService = inject(PipelineStepService);

  getNextViewingStageId(
    stageInstances: StageInstanceShape[]
  ): StageIdType | null {
    if (!stageInstances?.length) return null;

    const filteredStageInstances = stageInstances.filter(
      (stageInstances: StageInstanceShape) => {
        return stageInstances.mode === this.#pipelineStepService.builderMode();
      }
    );

    const sorted = [...filteredStageInstances].sort(
      (a, b) => a.index - b.index
    );

    // 1 First Idle wins
    const idle = sorted.find((s) => s.status === StageStatusTypes.Idle);
    if (idle) return idle.stageId;

    // 2 First Inactive wins
    const inactive = sorted.find((s) => s.status === StageStatusTypes.Inactive);
    if (inactive) return inactive.stageId;

    // 3 Everything complete → stay on last stage
    return sorted[sorted.length - 1].stageId;
  }
}
