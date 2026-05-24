import { Component, inject, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';
import { map } from 'rxjs';
import { RelatedTopicsService } from './services/related-topics.service';

/**
 * The pipeline related topics documentation
 */
@Component({
  selector: 'sdux-pipeline-related-topics',
  standalone: true,
  imports: [RouterModule, BrandNameComponent],
  templateUrl: './related-topic.component.html',
  styleUrls: ['../scss/example.scss', './related-topic.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineRelatedTopicComponent {
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
}
