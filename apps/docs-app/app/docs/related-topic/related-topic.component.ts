import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  OverflowPillDirective
} from '@sdux-vault/ui/web-components';
import { map } from 'rxjs';
import { RelatedTopicsService } from './services/related-topics.service';

/**
 * The pipeline related topics documentation
 */
@Component({
  selector: 'sdux-pipeline-related-topics',
  standalone: true,
  imports: [RouterModule, BrandNameComponent, OverflowPillDirective],
  templateUrl: './related-topic.component.html',
  styleUrls: ['../scss/documentation.scss', './related-topic.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineRelatedTopicComponent {
  readonly isDocs = input(true);
  route = inject(ActivatedRoute);
  relatedTopicsService = inject(RelatedTopicsService);

  readonly links = toSignal(
    this.route.paramMap.pipe(
      map((params) => {
        const category =
          this.route.snapshot?.data['category'] ??
          params.get('category') ??
          'default';
        const type =
          this.route.snapshot?.data['type'] ?? params.get('type') ?? undefined;

        return this.relatedTopicsService.resolve({
          category,
          type
        });
      })
    )
  );

  /** Scrolls the page to the top when navigating to a new post. */
  scrollToTop(): void {
    const container = document.querySelector('mat-sidenav-content');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
