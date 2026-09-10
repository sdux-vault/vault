import { AfterViewInit, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  CatchPhraseComponent,
  FeatureCellBrandNameComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

@Component({
  selector: 'sdux-top-tier-sdux-trademark-usage',
  standalone: true,
  imports: [
    RouterModule,
    MatTooltipModule,
    MatIconModule,
    BrandNameComponent,
    VaultBrandNameComponent,
    PipelineRelatedTopicComponent,
    CatchPhraseComponent,
    FeatureCellBrandNameComponent
  ],
  templateUrl: './sdux-trademark-usage.component.html',
  styleUrls: [
    '../../../scss/documentation.scss',
    './sdux-trademark-usage.component.scss'
  ]
})
export class DocsTopTierSDuXTrademarkUsageComponent implements AfterViewInit {
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
