import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * ExampleViewerBodyComponent
 * --------------------------
 * Displays the content section of an example viewer.
 *
 * This component hosts projected example output and may display
 * a loading spinner while asynchronous examples are resolving.
 * It contains no internal logic and acts purely as a structural wrapper.
 */
@Component({
  selector: 'sdux-example-viewer-body',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './example-viewer-body.component.html',
  styleUrls: ['./example-viewer-body.component.scss']
})
export class ExampleViewerBodyComponent {}
