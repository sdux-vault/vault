import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {
  BrandNameComponent,
  PackageNameComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from '../../related-topic/related-topic.component';
import { AddonRoadMapConstants } from './constants/addons-roadmap-features.constant';
import { CoreRoadMapConstants } from './constants/core-roadmap-features.constant';
import { FutureRoadMapConstants } from './constants/future-roadmap-features.constant';
import { ProLicenseRoadMapConstants } from './constants/pro-roadmap-features.constant';
import { RoadMapShape } from './shapes/roadmap.shape';
import { CoreRoadmapSortKey } from './types/roadmap-sort-key.type';

@Component({
  selector: 'sdux-top-tier-roadmap',
  standalone: true,
  imports: [
    BrandNameComponent,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    VaultBrandNameComponent,
    PipelineRelatedTopicComponent,
    PackageNameComponent
  ],
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss', '../../scss/example.scss']
})
export class DocsTopTierRoadmapComponent {
  readonly coreSortOptions: { key: string; value: string }[] = [
    {
      key: 'behavior',
      value: 'Behavior'
    },
    {
      key: 'isExtendable',
      value: 'Extendable'
    },
    {
      key: 'feature',
      value: 'Feature'
    },
    {
      key: 'package',
      value: 'Package'
    }
  ];

  readonly addonSortOptions = [...this.coreSortOptions];

  readonly proLicenseSortOptions = [...this.coreSortOptions];

  readonly futureSortOptions: { key: string; value: string }[] = [
    {
      key: 'explanation',
      value: 'Explanation'
    },
    {
      key: 'isExtendable',
      value: 'Extendable'
    },
    {
      key: 'feature',
      value: 'Feature'
    },
    {
      key: 'type',
      value: 'Type'
    }
  ];

  selectedCoreSort: CoreRoadmapSortKey = 'feature';
  selectedAddonSort: CoreRoadmapSortKey = 'feature';
  selectedProLicenseSort: CoreRoadmapSortKey = 'feature';
  selectedFutureSort: CoreRoadmapSortKey = 'feature';

  coreSortAsc = true;
  addonSortAsc = true;
  proLicenseSortAsc = true;
  futureSortAsc = true;

  readonly coreRoadMapSource = [...CoreRoadMapConstants];
  readonly addonRoadMapSource = [...AddonRoadMapConstants];
  readonly proLicenseRoadMapSource = [...ProLicenseRoadMapConstants];
  readonly futureRoadMapSource = [...FutureRoadMapConstants];

  get sortedCoreRoadMap(): RoadMapShape[] {
    const key = this.selectedCoreSort;
    const dir = this.coreSortAsc ? 1 : -1;

    return this.#sortFeatures(this.coreRoadMapSource, key, dir);
  }

  get sortedAddonRoadMap(): RoadMapShape[] {
    const key = this.selectedAddonSort;
    const dir = this.addonSortAsc ? 1 : -1;

    return this.#sortFeatures(this.addonRoadMapSource, key, dir);
  }

  get sortedProLicenseRoadMap(): RoadMapShape[] {
    const key = this.selectedProLicenseSort;
    const dir = this.proLicenseSortAsc ? 1 : -1;

    return this.#sortFeatures(this.proLicenseRoadMapSource, key, dir);
  }

  get sortedFutureRoadMap(): RoadMapShape[] {
    const key = this.selectedFutureSort;
    const dir = this.futureSortAsc ? 1 : -1;

    return this.#sortFeatures(this.futureRoadMapSource, key, dir);
  }

  #sortFeatures(
    features: RoadMapShape[],
    key: string,
    dir: number
  ): RoadMapShape[] {
    // eslint-disable-next-line
    return [...features].sort((a: any, b: any) => {
      const av = a[key];
      const bv = b[key];

      // string / optional string
      return (
        String(av).localeCompare(String(bv ?? ''), undefined, {
          sensitivity: 'base'
        }) * dir
      );
    });
  }
}
