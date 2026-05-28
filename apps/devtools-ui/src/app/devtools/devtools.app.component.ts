import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root application component for the ngSDuX DevTools app.
 *
 * This component hosts the router outlet that renders the DevTools
 * splash page and any future routed panels. It contains no internal
 * logic and serves solely as the top-level shell for the DevTools UI.
 */
@Component({
  selector: 'sdux-devtools-root',
  imports: [RouterOutlet],
  templateUrl: './devtools.app.component.html',
  styleUrl: './devtools.app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevToolsApp {}
