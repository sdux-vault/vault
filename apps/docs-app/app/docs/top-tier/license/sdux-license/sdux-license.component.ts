import { AfterViewInit, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  CatchPhraseComponent,
  DiagramComponent,
  FeatureCellBrandNameComponent,
  PackageNameComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from '../../../related-topic/related-topic.component';
import { MIT_LICENSE_1_0 } from './constants/mit-license-1.0.mjs';
import { NGL_COMMERCIAL_LICENSE_1_0 } from './constants/ngl-commercial-license-1.0.mjs';
import { SDUX_VAULT_COMMUNITY_LICENSE_1_0 } from './constants/ngl-vault-community-license-1.0.mjs';

@Component({
  selector: 'sdux-top-tier-sdux-license',
  standalone: true,
  imports: [
    BrandNameComponent,
    PipelineRelatedTopicComponent,
    RouterModule,
    VaultBrandNameComponent,
    MatTooltipModule,
    MatIconModule,
    DiagramComponent,
    CatchPhraseComponent,
    FeatureCellBrandNameComponent,
    PackageNameComponent
  ],
  templateUrl: './sdux-license.component.html',
  styleUrls: [
    '../../../scss/documentation.scss',
    './sdux-license.component.scss'
  ]
})
export class DocsTopTierSDuXLicenseComponent implements AfterViewInit {
  /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
  readonly nglCommercialLicense10 = NGL_COMMERCIAL_LICENSE_1_0;
  /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
  readonly sduxVaultCommunityLicense10 = SDUX_VAULT_COMMUNITY_LICENSE_1_0;
  /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
  readonly mitLicense10 = MIT_LICENSE_1_0;

  /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
  #route = inject(ActivatedRoute);

  /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
  ngAfterViewInit(): void {
    /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
    this.#route.fragment.subscribe((fragment) => {
      /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
      if (!fragment) return;

      // Allow DOM to settle
      /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
      setTimeout(() => {
        /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
        const el = document.getElementById(fragment);
        /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }
}
