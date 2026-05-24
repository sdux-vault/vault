import { Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-testing-why-you-must-await-common',
  standalone: true,
  template: `
    @if (isAll()) {
      <h4>Why You Must Await</h4>
      <p>
        Settlement is published in a microtask after the synchronous pipeline
        completes. Without awaiting:
      </p>

      <ul>
        <li>Finalize has not fired</li>
        <li>DevTools events may be incomplete</li>
        <li>Snapshot not fully committed</li>
        <li>Cache/persist side effects may still be pending</li>
      </ul>

      <div class="table-title">Integration Stabilization</div>
      <table>
        <thead>
          <tr>
            <th class="column-200">Step</th>
            <th class="column-250">What Happens</th>
            <th class="column-auto">Why Await Is Required</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mutation</td>
            <td>enqueueAttempt()</td>
            <td>Work scheduled</td>
          </tr>
          <tr>
            <td>Pipeline</td>
            <td>Controllers → reducers</td>
            <td>Synchronous execution</td>
          </tr>
          <tr>
            <td>Finalize</td>
            <td>queueMicrotask()</td>
            <td>Commit boundary scheduled</td>
          </tr>
          <tr>
            <td>Settlement</td>
            <td>settled$ emits</td>
            <td>Commit becomes observable</td>
          </tr>
        </tbody>
      </table>
    }

    @if (isAngular()) {
      <h4>Why You Must Await</h4>
      <p>
        Settlement is published in a microtask after the synchronous pipeline
        completes. In Angular environments, an
        <code>effect()</code> may trigger an additional mutation after the first
        settlement boundary.
      </p>

      <ul>
        <li>Finalize has not fired</li>
        <li>DevTools events may be incomplete</li>
        <li>Snapshot not fully committed</li>
        <li>Cache/persist side effects may still be pending</li>
        <li>An Angular effect may enqueue a second mutation</li>
      </ul>

      <div class="table-title">Angular Stabilization (With Effects)</div>
      <table>
        <thead>
          <tr>
            <th class="column-200">Step</th>
            <th class="column-250">What Happens</th>
            <th class="column-auto">Stabilization Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mutation</td>
            <td>enqueueAttempt()</td>
            <td>Work scheduled in serialized conductor queue</td>
          </tr>
          <tr>
            <td>Pipeline Run #1</td>
            <td>Controllers → behaviors → reducers</td>
            <td>Synchronous compute phase</td>
          </tr>
          <tr>
            <td>Finalize #1</td>
            <td>queueMicrotask()</td>
            <td>Commit boundary scheduled</td>
          </tr>
          <tr>
            <td>Settlement #1</td>
            <td>settled$ emits</td>
            <td>Commit becomes observable</td>
          </tr>
          <tr>
            <td>Angular Effect</td>
            <td><code>effect()</code> evaluates</td>
            <td>
              If read-only → no additional work<br />
              If mutating → enqueues second attempt
            </td>
          </tr>
          <tr>
            <td>Pipeline Run #2 (Conditional)</td>
            <td>Second mutation processed</td>
            <td>Requires additional stabilization</td>
          </tr>
          <tr>
            <td>Finalize #2 (Conditional)</td>
            <td>queueMicrotask()</td>
            <td>Second commit boundary scheduled</td>
          </tr>
          <tr>
            <td>Settlement #2 (Conditional)</td>
            <td>settled$ emits again</td>
            <td>Second commit becomes observable</td>
          </tr>
        </tbody>
      </table>
    }
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultTestingWhyYouMustAwaitCommonComponent {
  type = input<string>('all');

  isAngular = computed(() => {
    return this.type() === 'angular';
  });

  isAll = computed(() => {
    return this.type() === 'all';
  });
}
