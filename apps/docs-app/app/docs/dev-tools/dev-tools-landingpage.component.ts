import { Component } from '@angular/core';
import { PipelineRoutingDirective } from 'apps/docs-app/app/docs/pipeline/directives/pipeline-routing.directive';
import { SDuXDevToolsBuiltInDebuggerComponent } from './build-in-debugger/built-in-debugger.component';
import { SDuXDevToolsEventBusComponent } from './event-bus/event-bus.component';
import { DevToolsOverviewComponent } from './overview/dev-tools-overview.component';
import { SDuXDevToolsVaultMonitorComponent } from './vault-monitor/vault-monitor.component';

@Component({
  selector: 'sdux-dev-tools-splashpage',
  standalone: true,
  imports: [
    SDuXDevToolsBuiltInDebuggerComponent,
    SDuXDevToolsEventBusComponent,
    SDuXDevToolsVaultMonitorComponent,
    DevToolsOverviewComponent
  ],
  templateUrl: './dev-tools-landingpage.component.html',
  styleUrls: ['../scss/example.scss']
})
export class DevtoolsLandingPageComponent extends PipelineRoutingDirective {}
