import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  OnInit,
  TemplateRef,
  input,
  signal
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ExampleViewerSourceComponent } from '../example-viewer-source/example-viewer-source.component';
import { ExampleViewerTabComponent } from '../example-viewer-tab/example-viewer-source-tab.component';
import { GenericTabComponent } from '../generic-tab/generic-tab.component';

/**
 * Describes a single tab rendered inside the multi-framework example viewer.
 */
interface TabEntry {
  /** Display label shown on the tab header. */
  label: string;

  /** Identifies which projected template supplies the tab's content. */
  template: 'angular' | 'core' | 'generic';
}

/**
 * Renders a multi-framework tabbed code example from two or three inputs:
 * an Angular template, a Core template (used for all other frameworks),
 * and an optional `<sdux-generic-tab>` for additional framework-specific examples.
 *
 * Tabs are rendered in alphabetical order by default.
 * The `description` input is combined with each framework name to produce
 * the `sdux-example-viewer-tab` label (e.g., "React — Sealed Pipeline").
 */
@Component({
  selector: 'sdux-multi-framework-example',
  standalone: true,
  imports: [
    MatTabsModule,
    NgTemplateOutlet,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent
  ],
  templateUrl: './multi-framework-example.component.html'
})
export class MultiFrameworkExampleComponent implements OnInit {
  /** Description appended to each tab label (e.g., "Sealed Pipeline"). */
  readonly description = input.required<string>();

  /** Template containing the Angular-specific code block. */
  @ContentChild('angular', { static: true })
  angularTemplate!: TemplateRef<unknown>;

  /** Template containing the core code block (used for all non-Angular frameworks). */
  @ContentChild('core', { static: true }) coreTemplate!: TemplateRef<unknown>;

  /** Optional generic tab component with its own label, order, and content. */
  @ContentChild(GenericTabComponent, { static: true })
  genericTab!: GenericTabComponent;

  /** Computed ordered list of tabs to render. */
  readonly tabs = signal<TabEntry[]>([]);

  /**
   * Computes the ordered tab list from the fixed framework set and any
   * optional generic tab, then writes the result to the `tabs` signal.
   */
  ngOnInit() {
    const allTabs: TabEntry[] = [
      { label: 'Angular', template: 'angular' },
      { label: 'Bun', template: 'core' },
      { label: 'Deno', template: 'core' },
      { label: 'Node.js', template: 'core' },
      { label: 'React', template: 'core' },
      { label: 'Solid', template: 'core' },
      { label: 'Svelte', template: 'core' },
      { label: 'Vanilla JS', template: 'core' },
      { label: 'Vue', template: 'core' },
      { label: 'Web Components', template: 'core' }
    ];

    if (this.genericTab) {
      const genericLabel = this.genericTab.label();
      const genericEntry: TabEntry = {
        label: genericLabel,
        template: 'generic'
      };
      const orderValue = this.genericTab.order();
      if (orderValue !== undefined) {
        allTabs.splice(orderValue, 0, genericEntry);
      } else if (this.genericTab.alphabetized()) {
        const index = allTabs.findIndex(
          (tab) => tab.label.toLowerCase() > genericLabel.toLowerCase()
        );
        if (index === -1) {
          allTabs.push(genericEntry);
        } else {
          allTabs.splice(index, 0, genericEntry);
        }
      } else {
        allTabs.push(genericEntry);
      }
    }

    this.tabs.set(allTabs);
  }

  /**
   * Resolves the projected template reference for a given tab entry.
   *
   * @param tab - The tab entry whose content template is requested.
   * @returns The `TemplateRef` corresponding to the tab's template type.
   */
  getTemplate(tab: TabEntry): TemplateRef<unknown> {
    switch (tab.template) {
      case 'angular':
        return this.angularTemplate;
      case 'generic':
        return this.genericTab.template;
      default:
        return this.coreTemplate;
    }
  }
}
