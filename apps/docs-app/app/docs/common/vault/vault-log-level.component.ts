import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-log-level-common',
  standalone: true,
  template: `
    <div class="table-title">LogLevel</div>
    <table class="documentation-table">
      <thead>
        <tr>
          <th class="column-250">Value</th>
          <th class="column-auto">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>off</td>
          <td>No logs are emitted.</td>
        </tr>

        <tr>
          <td>error</td>
          <td>Only error-level messages are logged.</td>
        </tr>

        <tr>
          <td>warn</td>
          <td>Warnings and errors are logged.</td>
        </tr>

        <tr>
          <td>log</td>
          <td>Standard log events, warnings, and errors are logged.</td>
        </tr>

        <tr>
          <td>debug</td>
          <td>All debug-level diagnostic information is emitted.</td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultLogLevelCommonComponent {}
