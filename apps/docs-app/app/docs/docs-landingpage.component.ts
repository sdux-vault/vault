import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { PipelineRoutingDirective } from './pipeline/directives/pipeline-routing.directive';
import { SDuXBestPracticesComponent } from './welcome/best-practices/best-practices.component';
import { SDuXContributorsComponent } from './welcome/contributors/contributors.component';
import { DocsTopTierCoreConceptsComponent } from './welcome/core-concepts.component';
import { DocsTopTierGettingStartedComponent } from './welcome/getting-started.component';
import { DocsTopTierHowToDefineYourStateComponent } from './welcome/how-to-define-your-state.component';
import { DocsTopTierSDuXLicenseComponent } from './welcome/license/sdux-license/sdux-license.component';
import { DocsTopTierSDuXTrademarkUsageComponent } from './welcome/license/sdux-trademark-usage/sdux-trademark-usage.component';
import { DocsTopTierPressComponent } from './welcome/press/press.component';
import { DocsTopTierRoadmapComponent } from './welcome/roadmap/roadmap.component';
import { DocsTopTierSDuXReduxSimilaritiesComponent } from './welcome/sdux-redux-similarities.component';
import { DocsTopTierSupportedLanguagesComponent } from './welcome/supported-languages/supported-languages.component';
import { SDuXTestingComponent } from './welcome/testing/testing.component';
import { DocsTopTierWhatIsSDuXComponent } from './welcome/what-is-sdux.component';

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
    DocsTopTierPressComponent,
    SDuXTestingComponent,
    SDuXBestPracticesComponent,
    SDuXContributorsComponent
  ],
  templateUrl: './docs-landingpage.component.html',
  styleUrls: ['./scss/documentation.scss']
})
export class DocsLandingPageComponent extends PipelineRoutingDirective {}
