import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from './related-topic.component';
import { RelatedTopicsService } from './services/related-topics.service';

describe('Component: PipelineRelatedTopics', () => {
  let fixture: ComponentFixture<PipelineRelatedTopicComponent>;
  let component: PipelineRelatedTopicComponent;

  let paramMap$: BehaviorSubject<ParamMap>;
  let activatedRouteMock: Partial<ActivatedRoute>;
  let relatedTopicsServiceSpy: jasmine.SpyObj<RelatedTopicsService>;

  const mockLinks: any = Object({
    links: [
      { id: 1, link: '/docs/a', display: 'A' },
      { id: 2, link: '/docs/b', display: 'B' }
    ],
    crossLinks: [
      { id: 3, link: '/cross/c', display: 'C' },
      { id: 4, link: '/cross/d', display: 'D' }
    ],
    globalLinks: [
      { id: 5, link: '/global/e', display: 'E' },
      { id: 6, link: '/global/f', display: 'F' }
    ],
    globalCrossLinks: [
      { id: 7, link: '/global-cross/g', display: 'G' },
      { id: 8, link: '/global-cross/h', display: 'H' }
    ]
  });
  beforeEach(() => {
    // -----------------------------
    // Mock ActivatedRoute.paramMap
    // -----------------------------
    paramMap$ = new BehaviorSubject(
      convertToParamMap({
        category: 'stepwise',
        type: 'with-stepwise-filter-behavior'
      })
    );

    activatedRouteMock = {
      paramMap: paramMap$.asObservable()
    };

    // -----------------------------
    // Mock RelatedTopicsService
    // -----------------------------
    relatedTopicsServiceSpy = jasmine.createSpyObj<RelatedTopicsService>(
      'RelatedTopicsService',
      ['resolve']
    );
    relatedTopicsServiceSpy.resolve.and.returnValue(mockLinks);

    // -----------------------------
    // TestBed setup
    // -----------------------------
    TestBed.configureTestingModule({
      imports: [PipelineRelatedTopicComponent, sduxTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: RelatedTopicsService, useValue: relatedTopicsServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(PipelineRelatedTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ---------------------------------------------------------------------------
  // Initial resolution
  // ---------------------------------------------------------------------------

  it('should resolve related topics using route params', () => {
    const result = component.links();

    expect(relatedTopicsServiceSpy.resolve).toHaveBeenCalledWith({
      category: 'stepwise',
      type: 'with-stepwise-filter-behavior'
    });

    expect(result).toEqual(mockLinks);
  });

  // ---------------------------------------------------------------------------
  // Default category fallback
  // ---------------------------------------------------------------------------

  it('should default category to "stepwise" when category param is missing', () => {
    paramMap$.next(
      convertToParamMap({
        type: 'with-stepwise-resolve-behavior'
      })
    );

    const result = component.links();

    expect(relatedTopicsServiceSpy.resolve).toHaveBeenCalledWith({
      category: 'default',
      type: 'with-stepwise-resolve-behavior'
    });

    expect(result).toEqual(mockLinks);
  });

  // ---------------------------------------------------------------------------
  // type normalization
  // ---------------------------------------------------------------------------

  it('should pass type as undefined when type param is missing', () => {
    paramMap$.next(
      convertToParamMap({
        category: 'stepwise'
      })
    );

    const result = component.links();

    expect(relatedTopicsServiceSpy.resolve).toHaveBeenCalledWith({
      category: 'stepwise',
      type: undefined
    });

    expect(result).toEqual(mockLinks);
  });

  // ---------------------------------------------------------------------------
  // Reactivity
  // ---------------------------------------------------------------------------

  it('should recompute links when route params change', () => {
    const newLinks: any = Object({
      links: [Object({ link: '/docs/x', display: 'X' })]
    });

    relatedTopicsServiceSpy.resolve.and.returnValue(newLinks);

    paramMap$.next(
      convertToParamMap({
        category: 'with-stepwise-controller'
      })
    );

    const result = component.links();

    expect(relatedTopicsServiceSpy.resolve).toHaveBeenCalledWith({
      category: 'with-stepwise-controller',
      type: undefined
    });

    expect(result).toEqual(newLinks);
  });

  // ---------------------------------------------------------------------------
  // Multiple emissions safety
  // ---------------------------------------------------------------------------

  it('should always reflect the latest route params', () => {
    relatedTopicsServiceSpy.resolve.and.callFake(({ category }) =>
      Object({
        links: Object({ link: `/docs/${category}`, display: category })
      })
    );

    paramMap$.next(convertToParamMap({ category: 'a' }));
    expect(component.links()?.links).toEqual(
      Object({ link: '/docs/a', display: 'a' })
    );

    paramMap$.next(convertToParamMap({ category: 'b' }));
    expect(component.links()?.links).toEqual(
      Object({ link: '/docs/b', display: 'b' })
    );
  });

  // ---------------------------------------------------------------------------
  // isDocs input
  // ---------------------------------------------------------------------------

  it('should default isDocs to true', () => {
    expect(component.isDocs()).toBe(true);
  });

  it('should accept isDocs as false', () => {
    fixture.componentRef.setInput('isDocs', false);
    fixture.detectChanges();
    expect(component.isDocs()).toBe(false);
  });

  describe('scrollToTop', () => {
    it('should scroll to top when scrollToTop is called', () => {
      const container = document.createElement('div');
      const scrollSpy = jasmine.createSpy('scrollTo');
      container.scrollTo = scrollSpy;
      spyOn(document, 'querySelector').and.returnValue(container);
      component.scrollToTop();
      expect(scrollSpy).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      });
    });

    it('should fall back to window.scrollTo when mat-sidenav-content is not found', () => {
      spyOn(document, 'querySelector').and.returnValue(null);
      const windowScrollSpy = jasmine.createSpy('scrollTo');
      window.scrollTo = windowScrollSpy;
      component.scrollToTop();
      expect(windowScrollSpy).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
});
