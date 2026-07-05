import { Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-testing-standard-execution-case-common',
  standalone: true,
  template: `
    @if (isAll()) {
      <div class="section-body">
        <p>This is the standard application testing case:</p>

        <ul>
          <li>
            Full
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          </li>
          <li>Registered with Vault</li>
          <li>Controllers, behaviors, reducers active</li>
          <li><code>vaultSettled(key)</code> available</li>
        </ul>
      </div>
    }

    @if (isAngular()) {
      <div class="section-body">
        <p>An <code>effects</code> scenario introduces a third scheduler:</p>
        <div class="toc-container">
          <ul class="toc">
            <li>Angular injection timing</li>
            <li>Signals</li>
            <li><code>effect()</code> scheduling</li>
            <li>Constructor-triggered merges</li>
            <li>Possible <code>TestBed.tick()</code></li>
          </ul>

          <h5>The Three Clocks</h5>
          <ul class="toc">
            <li>Clock 1 → Vault Conductor Queue</li>
            <li>Clock 2 → Microtask Finalize</li>
            <li>Clock 3 → Angular Effect Scheduler</li>
          </ul>
        </div>
      </div>
    }
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultTestingStandardExecutionCaseCommonComponent {
  type = input<string>('all');

  isAngular = computed(() => {
    return this.type() === 'angular';
  });

  isAll = computed(() => {
    return this.type() === 'all';
  });
}
