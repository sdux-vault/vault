import { Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-array-merge-comparison-common',
  standalone: true,
  template: `
    <div class="table-title">Input and Result Examples</div>
    <table aria-label="Input and Result Examples">
      <thead>
        <tr>
          <th scope="col" class="column-200">Inputs</th>
          @for (type of order(); track type) {
            @if (type === 'Default') {
              <th scope="col" class="column-auto">{{ type }} Result</th>
            } @else if (type === 'Append') {
              <th scope="col" class="column-auto">{{ type }} Result</th>
            } @else if (type === 'Push') {
              <th scope="col" class="column-auto">{{ type }} Result</th>
            }
          }
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <strong>current:</strong> [1, 2, 3]
            <p><strong>next:</strong> [4, 5]</p>
          </td>
          @for (type of order(); track type) {
            <td>
              @if (type === 'Default') {
                [4, 5]
              } @else if (type === 'Append') {
                [1, 2, 3, 4, 5]
              } @else if (type === 'Push') {
                [1, 2, 3, [4, 5]]
              }
            </td>
          }
        </tr>
        <tr>
          <td>
            <strong>current:</strong> [1, 2, 3]
            <p><strong>next:</strong> 10</p>
          </td>
          @for (type of order(); track type) {
            <td>
              @if (type === 'Default') {
                10
              } @else if (type === 'Append') {
                10
              } @else if (type === 'Push') {
                [1, 2, 3, 10]
              }
            </td>
          }
        </tr>
        <tr>
          <td>
            <strong>current:</strong> &#123; a: 1 &#125;
            <p><strong>next:</strong> [1, 2, 3]</p>
          </td>
          @for (type of order(); track type) {
            <td>
              @if (type === 'Default') {
                [1, 2, 3]
              } @else if (type === 'Append') {
                [1, 2, 3]
              } @else if (type === 'Push') {
                [1, 2, 3]
              }
            </td>
          }
        </tr>
        <tr>
          <td>
            <strong>current:</strong> &#123; a: 1 &#125;
            <p><strong>next:</strong> &#123; b: 2 &#125;</p>
          </td>
          @for (type of order(); track type) {
            <td>
              @if (type === 'Default') {
                &#123; b: 2 &#125;
              } @else if (type === 'Append') {
                &#123; b: 2 &#125;
              } @else if (type === 'Push') {
                &#123; b: 2 &#125;
              }
            </td>
          }
        </tr>
        <tr>
          <td>
            <strong>current:</strong> null
            <p><strong>next:</strong> [9, 9]</p>
          </td>
          @for (type of order(); track type) {
            <td>
              @if (type === 'Default') {
                [9, 9]
              } @else if (type === 'Append') {
                [9, 9]
              } @else if (type === 'Push') {
                [9, 9]
              }
            </td>
          }
        </tr>
        <tr>
          <td>
            <strong>current:</strong> undefined
            <p><strong>next:</strong> [9, 9]</p>
          </td>
          @for (type of order(); track type) {
            <td>
              @if (type === 'Default') {
                [9, 9]
              } @else if (type === 'Append') {
                [9, 9]
              } @else if (type === 'Push') {
                [9, 9]
              }
            </td>
          }
        </tr>
        <tr>
          <td>
            <strong>current:</strong> 10
            <p><strong>next:</strong> 5</p>
          </td>
          @for (type of order(); track type) {
            <td>
              @if (type === 'Default') {
                5
              } @else if (type === 'Append') {
                5
              } @else if (type === 'Push') {
                5
              }
            </td>
          }
        </tr>
        <tr>
          <td>
            <strong>current:</strong> [1, 2, 3]
            <p><strong>next:</strong> 'not-an-array'</p>
          </td>
          @for (type of order(); track type) {
            <td>
              @if (type === 'Default') {
                'not-an-array'
              } @else if (type === 'Append') {
                'not-an-array'
              } @else if (type === 'Push') {
                [1 , 2, 3, 'not-an-array']
              }
            </td>
          }
        </tr>
        <tr>
          <td>
            <strong>current:</strong> [[1], [2]]
            <p><strong>next:</strong> [[9], [8]]</p>
          </td>
          @for (type of order(); track type) {
            <td>
              @if (type === 'Default') {
                [[9], [8]]
              } @else if (type === 'Append') {
                [[1], [2], [9], [8]]
              } @else if (type === 'Push') {
                [[1], [2], [[9], [8]]]
              }
            </td>
          }
        </tr>
      </tbody>
    </table>

    <div class="table-title">State Preservation and Resets</div>
    <table aria-label="State Preservation and Reset Examples">
      <thead>
        <tr>
          <th scope="col" class="column-200">Inputs</th>
          @for (type of order(); track type) {
            @if (type === 'Default') {
              <th scope="col" class="column-auto">{{ type }} Result</th>
            } @else if (type === 'Append') {
              <th scope="col" class="column-auto">{{ type }} Result</th>
            } @else if (type === 'Push') {
              <th scope="col" class="column-auto">{{ type }} Result</th>
            }
          }
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <strong>current:</strong> [1, 2, 3]
            <p><strong>next:</strong> null</p>
          </td>
          @for (type of order(); track type) {
            <td>
              @if (type === 'Default') {
                <span class="code">null</span>
                <p>state is intentionally set to undefined</p>
              } @else if (type === 'Append') {
                <span class="code">null</span>
                <p>state is intentionally set to undefined</p>
              } @else if (type === 'Push') {
                <span class="code">null</span>
                <p>state is intentionally set to undefined</p>
              }
            </td>
          }
        </tr>
        <tr>
          <td>
            <strong>current:</strong> [1, 2, 3]
            <p><strong>next:</strong> undefined</p>
            <p><strong>clearUndefined:</strong> undefined</p>
          </td>
          @for (type of order(); track type) {
            <td>
              @if (type === 'Default') {
                [1, 2, 3]
                <p>state is intentionally preserved by default</p>
              } @else if (type === 'Append') {
                [1, 2, 3]
                <p>state is intentionally preserved by default</p>
              } @else if (type === 'Push') {
                [1, 2, 3]
                <p>state is intentionally preserved by default</p>
              }
            </td>
          }
        </tr>
        <tr>
          <td>
            <strong>current:</strong> [1, 2, 3]
            <p><strong>next:</strong> undefined</p>
            <p><strong>clearUndefined:</strong> false</p>
          </td>
          @for (type of order(); track type) {
            <td>
              @if (type === 'Default') {
                [1, 2, 3]
                <p>state is explicitly preserved</p>
              } @else if (type === 'Append') {
                [1, 2, 3]
                <p>state is explicitly preserved</p>
              } @else if (type === 'Push') {
                [1, 2, 3]
                <p>state is explicitly preserved</p>
              }
            </td>
          }
        </tr>
        <tr>
          <td>
            <strong>current:</strong> [1, 2, 3]
            <p><strong>next:</strong> undefined</p>
            <p><strong>clearUndefined:</strong> true</p>
          </td>
          @for (type of order(); track type) {
            <td>
              @if (type === 'Default') {
                <span class="code"
                  ><a href="/docs/references/const/vault_clear_state"
                    >VAULT_CLEAR_STATE</a
                  ></span
                >
                <p>state is intentionally set to undefined</p>
              } @else if (type === 'Append') {
                <span class="code"
                  ><a href="/docs/references/const/vault_clear_state"
                    >VAULT_CLEAR_STATE</a
                  ></span
                >
                <p>state is intentionally set to undefined</p>
              } @else if (type === 'Push') {
                <span class="code"
                  ><a href="/docs/references/const/vault_clear_state"
                    >VAULT_CLEAR_STATE</a
                  ></span
                >
                <p>state is intentionally set to undefined</p>
              }
            </td>
          }
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultArrayMergeComparisonCommonComponent {
  type = input<string>('default');

  protected readonly order = computed(() => {
    if (this.type() === 'push') {
      return ['Push', 'Append', 'Default'];
    } else if (this.type() === 'append') {
      return ['Append', 'Push', 'Default'];
    } else {
      return ['Default', 'Append', 'Push'];
    }
  });
}
