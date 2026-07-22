import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DevToolsApp } from '../../src/app/devtools/devtools.app.component';
import { StarTrekComponent } from './feature-cells/star-trek/star-trek.component';
import { StarWarsComponent } from './feature-cells/star-wars/star-wars.component';

/**
 * Demo shell that hosts the DevTools splash page with a real FeatureCell.
 */
@Component({
  selector: 'sdux-devtools-demo',
  standalone: true,
  imports: [DevToolsApp, StarTrekComponent, StarWarsComponent],
  templateUrl: './demo-app.component.html',
  styleUrl: './demo-app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoAppComponent {
  /**
   * Activates global insights on the VaultMonitor singleton so the
   * monitor emits complete state, payload, and error data — mirroring
   * the Chrome extension bridge.
   */
  constructor() {
    // Activate global insights so the monitor emits complete state,
    // payload, and error data — mirroring the Chrome extension bridge.
    const monitor = (window as unknown as Record<string, unknown>)['sdux'] as
      | Record<string, unknown>
      | undefined;
    const instance = monitor?.['vaultMonitorInstance'] as
      | { activateGlobalInsights: (config: unknown) => void }
      | undefined;
    instance?.activateGlobalInsights({
      id: 'devtools-standalone',
      wantsState: true,
      wantsPayload: true,
      wantsCandidates: true,
      wantsErrors: true
    });
  }
}
