import { Component, ViewEncapsulation } from '@angular/core';
import { PackageNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-controller-tab-sync-common',
  standalone: true,
  template: `
    <div class="table-title">Tab Sync Controller</div>
    <table aria-label="Tab Sync Controller">
      <thead>
        <tr>
          <th scope="col" class="column-250">Controller</th>
          <th scope="col" class="column-auto">Description</th>
          <th scope="col" class="column-150">Package</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <strong
              ><a href="/docs/pipeline/controllers/with-tab-sync-controller"
                >withTabSyncController</a
              ></strong
            >
            <p>type: controller</p>
          </td>
          <td>
            Coordinates initial cross-tab state negotiation using a localStorage
            tab registry for peer detection and BroadcastChannel for snapshot
            exchange. On the first pipeline Attempt, the controller determines
            whether to adopt peer state or proceed independently. After
            negotiation, the controller abstains on all subsequent Attempts and
            responds to snapshot requests from newly opened tabs.
          </td>
          <td><sdux-package-name [package]="'core'" /></td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [PackageNameComponent]
})
export class VaultControllerTabSyncCommonComponent {}
