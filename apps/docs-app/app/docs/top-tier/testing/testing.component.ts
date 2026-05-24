import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { VaultTestingExampleCommonComponent } from '../../common/testing/testing-example.component';
import { VaultTestingRuleCommonComponent } from '../../common/testing/testing-rule.component';
import { VaultTestingStandardExecutionCaseCommonComponent } from '../../common/testing/testing-standard-execution-case.component';
import { VaultTestingWhyYouMustAwaitCommonComponent } from '../../common/testing/testing-why-await.component';
import { VaultConfigCommonComponent } from '../../common/vault/vault-config.component';
import { VaultLogLevelCommonComponent } from '../../common/vault/vault-log-level.component';
import { PipelineRoutingDirective } from '../../pipeline/directives/pipeline-routing.directive';

/**
 * The testing the pipeline documentation
 */
@Component({
  selector: 'sdux-testing',
  standalone: true,
  imports: [
    DiagramComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    MatTabsModule,
    BrandNameComponent,
    VaultConfigCommonComponent,
    VaultLogLevelCommonComponent,
    VaultTestingWhyYouMustAwaitCommonComponent,
    VaultTestingExampleCommonComponent,
    VaultTestingRuleCommonComponent,
    VaultTestingStandardExecutionCaseCommonComponent,
    FeatureCellBrandNameComponent,
    PackageNameComponent
  ],
  templateUrl: './testing.component.html',
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SDuXTestingComponent extends PipelineRoutingDirective {}
