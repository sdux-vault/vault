import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { PipelineRoutingDirective } from './pipeline/directives/pipeline-routing.directive';
import { SDuXBestPracticesComponent } from './top-tier/best-practices/best-practices.component';
import { SDuXContributorsComponent } from './top-tier/contributors/contributors.component';
import { DocsTopTierCoreConceptsComponent } from './top-tier/core-concepts.component';
import { DocsTopTierGettingStartedComponent } from './top-tier/getting-started.component';
import { DocsTopTierHowToDefineYourStateComponent } from './top-tier/how-to-define-your-state.component';
import { DocsTopTierSDuXLicenseComponent } from './top-tier/license/sdux-license/sdux-license.component';
import { DocsTopTierSDuXTrademarkUsageComponent } from './top-tier/license/sdux-trademark-usage/sdux-trademark-usage.component';
import { DocsTopTierRoadmapComponent } from './top-tier/roadmap/roadmap.component';
import { DocsTopTierSDuXReduxSimilaritiesComponent } from './top-tier/sdux-redux-similarities.component';
import { DocsTopTierSupportedLanguagesComponent } from './top-tier/supported-languages/supported-languages.component';
import { SDuXTestingComponent } from './top-tier/testing/testing.component';
import { DocsTopTierWhatIsSDuXComponent } from './top-tier/what-is-sdux.component';

@Component({
  selector: 'sdux-value-splashpage',
  standalone: true,
  imports: [
    MatTabsModule,
    MatExpansionModule,
    DocsTopTierCoreConceptsComponent,
    DocsTopTierGettingStartedComponent,
    DocsTopTierWhatIsSDuXComponent,
    DocsTopTierSDuXReduxSimilaritiesComponent,
    DocsTopTierRoadmapComponent,
    DocsTopTierHowToDefineYourStateComponent,
    DocsTopTierSupportedLanguagesComponent,
    DocsTopTierSDuXLicenseComponent,
    DocsTopTierSDuXTrademarkUsageComponent,
    SDuXTestingComponent,
    SDuXBestPracticesComponent,
    SDuXContributorsComponent
  ],
  templateUrl: './docs-landingpage.component.html',
  styleUrls: ['./scss/example.scss']
})
export class DocsLandingPageComponent extends PipelineRoutingDirective {}
