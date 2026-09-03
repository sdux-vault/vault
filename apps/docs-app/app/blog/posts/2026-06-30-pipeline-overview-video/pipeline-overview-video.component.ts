import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-pipeline-overview-video',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    RouterModule,
    BrandNameComponent,
    BrandNameComponent,
    SDuXVideoComponent
  ],
  template: `
    <sdux-blog-layout id="pipeline-overview-video">
      <header class="docs-header">
        <p class="lead">
          Today I'm excited to share something I've wanted to build for a long
          time — the first <sdux-brand-name /> video. It walks through the
          entire deterministic pipeline from end to end, and it marks a real
          step forward in how we deliver world-class documentation and training
          for engineers.
        </p>
      </header>

      <section class="section">
        <div class="section-title">Why Video</div>
        <div class="section-body">
          <p>
            Written documentation is the backbone of any serious library. But
            some concepts — especially a 10-stage pipeline that executes
            atomically — benefit from seeing the flow animated in real time.
            Video lets you watch state move through each layer and stage without
            jumping between doc pages.
          </p>
          <p>
            This is the first of many. The pipeline overview sets the
            foundation; future videos will dive into individual stages, testing
            patterns, and real-world integration scenarios.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What the Video Covers</div>
        <div class="section-body">
          <p>
            The video walks through the complete <sdux-brand-name />
            pipeline architecture in under 5 minutes. Here's the breakdown:
          </p>

          <table>
            <thead>
              <tr>
                <th>Chapter</th>
                <th>Description</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>What is <sdux-brand-name /></td>
                <td>
                  High-level introduction to the framework-agnostic state
                  management engine
                </td>
                <td>0:00</td>
              </tr>
              <tr>
                <td>Pipeline Definition</td>
                <td>
                  What a pipeline is and how it differs from traditional
                  dispatch models
                </td>
                <td>0:39</td>
              </tr>
              <tr>
                <td>Pipeline Parts</td>
                <td>
                  The core building blocks that compose a pipeline execution
                </td>
                <td>1:18</td>
              </tr>
              <tr>
                <td>Pipeline Layers</td>
                <td>
                  Conductor, Orchestrator, and
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                  definitions — the three execution boundaries
                </td>
                <td>1:35</td>
              </tr>
              <tr>
                <td>Pipeline Stages</td>
                <td>All 10 stages defined — Resolve through After Tap</td>
                <td>2:30</td>
              </tr>
              <tr>
                <td>Pipeline is Atomic</td>
                <td>
                  How the pipeline guarantees all-or-nothing state commitment
                </td>
                <td>3:24</td>
              </tr>
              <tr>
                <td><sdux-brand-name /> Guarantees</td>
                <td>
                  The execution guarantees enforced at every pipeline boundary
                </td>
                <td>4:22</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="diagram-section">
        <div class="section-title">Watch It</div>

        <div class="section-body">
          <div>
            This is just the beginning. More videos are coming — each one
            focused on making <sdux-brand-name /> engineering knowledge
            accessible to every developer, regardless of framework.
            <br />
          </div>

          <sdux-video videoId="m7ClyWSh754" [tooltip]="'SDuX Overview'" />
        </div>

        <div class="section-body">
          <p>
            The video is also available now on YouTube:

            <a
              href="https://youtu.be/m7ClyWSh754"
              target="_blank"
              rel="noopener">
              SDuX Vault Pipeline — How Every State Change Flows Through a
              Deterministic Pipeline
            </a>
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Explore the Docs</div>
        <div class="section-body">
          <p>
            Want to dig deeper into what the video covers? Start with the
            <a [routerLink]="['/docs/pipeline/pipeline-architecture']"
              >Pipeline Architecture</a
            >
            page or jump straight to the
            <a
              [routerLink]="['/docs/pipeline/behaviors/complete-pipeline-spec']"
              >Complete Pipeline Spec</a
            >.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogPipelineOverviewVideoComponent {}
