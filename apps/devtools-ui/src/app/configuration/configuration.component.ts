import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Configuration component for managing Vault settings
 * within the DevTools UI.
 */
@Component({
  selector: 'sdux-devtools-configuration',
  standalone: true,
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationComponent {}
