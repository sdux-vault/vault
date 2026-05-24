import { Component, computed, input } from '@angular/core';
import { ImageComponent } from '../image/image.component';
import { DiagramDialogService } from './service/diagram.dialog.service';

/**
 * DiagramComponent
 * ----------------
 * Lightweight wrapper around <sdux-image> for pipeline diagrams.
 *
 * - Constrains the inline diagram to a max height of 400px
 * - Lets width auto-scale based on aspect ratio
 * - On click, opens a full-size dialog (80vw) via DiagramDialogService
 *
 * Usage
 * -----
 *           <sdux-diagram
            image="diagrams/1.0/1.1-featurecell-lifecycle.svg"
            [tooltip]="'FeatureCell Lifecycle'"></sdux-diagram>
 */
@Component({
  selector: 'sdux-diagram',
  standalone: true,
  imports: [ImageComponent],
  template: `
    <div class="diagram-box">
      <!-- Trusted: tooltip() is a component input defaulting to a static string -->
      <div class="diagram-title" [innerHTML]="tooltip()"></div>
      <div class="diagram-wrapper" (click)="open()">
        <sdux-image
          [image]="image()"
          [height]="175"
          [tooltip]="tooltipInput()"
          [isThemeEnabled]="false"></sdux-image>
      </div>
    </div>
  `,
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent {
  /** Required image path, e.g. "diagrams/1.0/1.1-featurecell-lifecycle.svg". */
  readonly image = input.required<string>();

  /** Optional tooltip used for alt text and hover. */
  readonly tooltip = input<string>('Diagram');

  /**
   * The computed tooltip input
   */
  tooltipInput = computed(() => {
    return `${this.tooltip()} -- Click to Zoom`;
  });

  /**
   * constructor
   * @param diagramDialog The diagram Dialog Service from DI
   */
  constructor(private readonly diagramDialog: DiagramDialogService) {}

  /** Opens the full-size diagram dialog. */
  open(): void {
    const img = new Image();
    img.src = `assets/${this.image()}`;

    img.onload = () => {
      this.diagramDialog.open(
        this.image(),
        img.naturalWidth,
        img.naturalHeight,
        this.tooltip()
      );
    };
  }
}
