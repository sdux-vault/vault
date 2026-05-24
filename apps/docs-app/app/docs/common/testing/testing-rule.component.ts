import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-testing-rule-common',
  standalone: true,
  template: `
    <blockquote class="sdux-quote">
      <p>
        <strong>
          Rule: If a
          <a href="/docs/references/functions/feature-cell">FeatureCell</a> is
          registered, always await
          <code>vaultSettled(key)</code>
          after a state mutation.
        </strong>
      </p>

      <p>
        <strong>
          Symptom: If a test hangs or times out, it usually indicates incorrect
          stabilization — either a missing await after a mutation, or an
          unnecessary extra <code>await vaultSettled(key)</code> when no
          mutation occurred. Settlement must correspond exactly to a pipeline
          run.
        </strong>
      </p>
    </blockquote>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultTestingRuleCommonComponent {}
