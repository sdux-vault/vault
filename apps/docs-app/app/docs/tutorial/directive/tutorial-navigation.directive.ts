import {
  afterNextRender,
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  signal
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Directive()
export abstract class TutorialNavigationDirective implements AfterViewInit {
  readonly activeStep = signal('1-step-1');

  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly route = inject(ActivatedRoute);

  constructor() {
    afterNextRender(() => {
      const sections = Array.from(
        this.elementRef.nativeElement.querySelectorAll<HTMLElement>(
          '.tutorial-content .section[id]'
        )
      );

      if (typeof IntersectionObserver === 'undefined') {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const activeSection = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (first, second) =>
                first.boundingClientRect.top - second.boundingClientRect.top
            )[0];

          if (activeSection?.target.id) {
            this.activeStep.set(activeSection.target.id);
          }
        },
        {
          rootMargin: '-20% 0px -70% 0px',
          threshold: 0
        }
      );

      sections.forEach((section) => observer.observe(section));
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (!fragment) return;

      // Allow DOM to settle
      setTimeout(() => {
        const el = document.getElementById(fragment);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  isActiveStep(stepId: string): boolean {
    return this.activeStep() === stepId;
  }

  isAriaStep(stepId: string): 'step' | null {
    return this.isActiveStep(stepId) ? 'step' : null;
  }
}
