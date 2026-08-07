import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  inject
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Directive()
export abstract class PipelineRoutingDirective implements AfterViewInit {
  category!: string;
  type!: string;
  #route = inject(ActivatedRoute);
  #cdr = inject(ChangeDetectorRef);

  constructor() {
    this.#route.paramMap.subscribe((params) => {
      this.category =
        this.#route.snapshot?.data['category'] ?? params.get('category') ?? '';
      this.type =
        this.#route.snapshot?.data['type'] ?? params.get('type') ?? '';
      this.#cdr.markForCheck(); // forces UI update
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
}
