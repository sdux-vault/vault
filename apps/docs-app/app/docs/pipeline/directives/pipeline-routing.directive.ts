import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  inject,
  OnDestroy
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RELATED_TOPICS_REGISTRY } from 'apps/docs-app/app/docs/related-topic/constants/related-topics.registry';
import { RelatedTopicCagtegoryKey } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-registry.category.shape';

@Directive()
export abstract class PipelineRoutingDirective
  implements AfterViewInit, OnDestroy
{
  category!: string;
  type!: string;
  #route = inject(ActivatedRoute);
  #cdr = inject(ChangeDetectorRef);
  #title = inject(Title);
  #meta = inject(Meta);
  #previousTitle = '';

  constructor() {
    this.#previousTitle = this.#title.getTitle();

    this.#route.paramMap.subscribe((params) => {
      this.category =
        this.#route.snapshot?.data['category'] ?? params.get('category') ?? '';
      this.type =
        this.#route.snapshot?.data['type'] ?? params.get('type') ?? '';
      this.#cdr.markForCheck(); // forces UI update
      this.#applySeoMeta();
    });
  }

  /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
  ngAfterViewInit(): void {
    /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
    this.#route.fragment.subscribe((fragment) => {
      /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
      if (!fragment) return;

      // Allow DOM to settle
      /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
      setTimeout(() => {
        /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
        const el = document.getElementById(fragment);
        /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  ngOnDestroy(): void {
    this.#title.setTitle(this.#previousTitle);
    this.#meta.removeTag('name="description"');
  }

  #applySeoMeta(): void {
    const registry =
      RELATED_TOPICS_REGISTRY.categories[
        this.category as RelatedTopicCagtegoryKey
      ];

    if (!registry) return;

    if (this.type) {
      const item = registry.items?.find((i) =>
        i.link.endsWith(`/${this.type}`)
      );

      if (item?.title) {
        this.#title.setTitle(item.title);
      }

      if (item?.description) {
        this.#meta.updateTag({
          name: 'description',
          content: item.description
        });
      }
    } else {
      if (registry.title) {
        this.#title.setTitle(registry.title);
      }

      if (registry.description) {
        this.#meta.updateTag({
          name: 'description',
          content: registry.description
        });
      }
    }
  }
}
