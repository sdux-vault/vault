export const COMPONENT = `
import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { VaultSignalStateRef } from '@sdux/angular';
import { ExampleViewerTableComponent } from '@sdux/web-components';
import { BankEmployeeModel } from 'src/app/docs/models/bank-employee.model';
import { userListSourceCodeModel } from 'src/app/docs/users/user-cell-manual/source-code/user-list/user-list.code';
import { ValueResolveService } from './service/value-resolve.example.service';


* If a custom queue class is supplied in the config, it is instantiated here.

@Component({
  selector: 'sdux-value-resolve-example',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTableModule, MatIconModule, ExampleViewerTableComponent],
  templateUrl: './resolve-value.example.component.html',
  styleUrls: ['../../../scss/documentation.scss']
})
export class ValueResolveExampleComponent {
  private readonly service = inject(ValueResolveService);
  userListSourceCode = userListSourceCodeModel;
  readonly employeeList: VaultSignalStateRef<BankEmployeeModel[]>;

  public dataSource = computed(() => {
    return this.service.state().value()!;
  });

  constructor() {
    this.employeeList = this.service.state();
  }
}
`;
