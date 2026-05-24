import { Component, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { VaultInterceptorCommonComponent } from 'apps/docs-app/app/docs/common/interceptor/interceptor-behaviors.component';
import { VaultInterceptorFluentApiCommonComponent } from 'apps/docs-app/app/docs/common/interceptor/interceptor-fluent-api.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
/**
 * PipelineInterceptorsComponent
 * -----------------------------
 * Documentation module for the **Interceptor Stage** of the SDuX pipeline.
 *
 * This component renders the interceptor section of the Full Pipeline
 * Specification. It explains how upstream interceptor behaviors work,
 * how they modify or suppress incoming state packets, and how they
 * integrate with the rest of the pipeline.
 *
 * Purpose
 * -------
 * • Provides a dedicated documentation panel for the Interceptor Stage
 * • Lists all available interceptor behaviors (debounce, delay, throttle, etc.)
 * • Describes input rules, timing semantics, and pipeline implications
 * • Included as a subsection within the FullPipelineSpecComponent
 *
 * About Interceptors
 * ------------------
 * Interceptors run **before the Resolve stage** and are responsible for:
 * • delaying, throttling, debouncing, or pacing incoming writes
 * • suppressing invalid or excessive updates
 * • shaping when and how upstream values enter the pipeline
 *
 * Structure
 * ---------
 * This component is intentionally minimal. It delegates all UI and
 * explanatory content to its associated HTML template:
 *
 *   ./interceptors.pipeline.component.html
 *
 * Styling is applied globally (ViewEncapsulation.None) because pipeline
 * documentation sections often rely on shared structural styles.
 *
 * Usage
 * -----
 * Automatically included in:
 *   <sdux-full-pipeline-spec>
 *
 * and should not be used directly by application code.
 */

@Component({
  selector: 'sdux-pipeline-interceptors-behavior',
  standalone: true,
  imports: [
    BrandNameComponent,
    RouterModule,
    DiagramComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    PipelineRelatedTopicComponent,
    MatTabGroup,
    MatTab,
    VaultInterceptorFluentApiCommonComponent,
    VaultInterceptorCommonComponent,
    PackageNameComponent
  ],
  templateUrl: './interceptors.pipeline.component.html',
  styleUrls: ['../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineInterceptorsBehaviorComponent {}
