import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  NavigationEnd,
  ParamMap,
  Router
} from '@angular/router';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { Observable, of, Subject } from 'rxjs';
import { TutorialAngularComponent } from './tutorial.angular.component';

describe('Component: TutorialAngularComponent', () => {
  let fixture: ComponentFixture<TutorialAngularComponent>;
  let component: TutorialAngularComponent;
  let fragment$: Subject<string | null>;
  let routerEvents$: Subject<unknown>;
  let route: {
    fragment: Subject<string | null>;
    paramMap: Observable<ParamMap>;
    snapshot: { data: Record<string, unknown> };
    firstChild?: { snapshot: { url: { path: string }[] } };
  };

  beforeEach(async () => {
    fragment$ = new Subject<string | null>();
    routerEvents$ = new Subject<unknown>();
    route = {
      fragment: fragment$,
      paramMap: of(convertToParamMap({})),
      snapshot: { data: {} }
    };

    await TestBed.configureTestingModule({
      imports: [TutorialAngularComponent, sduxTestingModule],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ActivatedRoute, useValue: route },
        { provide: Router, useValue: { events: routerEvents$ } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialAngularComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('expands the selected chapter and collapses the other chapters', () => {
    component.selectTutorialChapter(2);

    expect(component.isTutorialGroupExpanded(1)).toBeFalse();
    expect(component.isTutorialGroupExpanded(2)).toBeTrue();
    expect(component.isChapterExpanded(1)).toBeFalse();
    expect(component.isChapterExpanded(2)).toBeTrue();
  });

  it('exposes step, number, aria-label, and expansion helpers', () => {
    expect(component.getStepId(0, 1)).toBe('1-step-2');
    expect(component.getChapterLink(2)).toBe('./chapter-3');
    expect(component.getStepNumber(1)).toBe(2);
    expect(component.getTutorialGroupAriaLabel(1, 'Characters')).toBe(
      'Go to Tutorial 2: Characters'
    );
    expect(component.getStepAriaLabel(1, 1, 'Display')).toBe(
      'Go to Chapter 2, Step 2: Display'
    );
    expect(component.getTutorialGroupToggleAriaLabel('Basics', true)).toBe(
      'Collapse Basics steps'
    );
    expect(component.getTutorialGroupToggleAriaLabel('Basics', false)).toBe(
      'Expand Basics steps'
    );
    expect(component.getTutorialChapterToggleAriaLabel('Basics', true)).toBe(
      'Collapse Basics'
    );
    expect(component.getTutorialChapterToggleAriaLabel('Basics', false)).toBe(
      'Expand Basics'
    );
    expect(component.isTutorialGroupExpanded(999)).toBeFalse();
    expect(component.isChapterExpanded(999)).toBeFalse();
  });

  it('toggles tutorial groups independently', () => {
    expect(component.isTutorialGroupExpanded(1)).toBeTrue();

    component.toggleTutorialGroup(1);
    expect(component.isTutorialGroupExpanded(1)).toBeFalse();

    component.toggleTutorialGroup(1);
    expect(component.isTutorialGroupExpanded(1)).toBeTrue();
  });

  it('collapses an open chapter or selects a closed chapter', () => {
    component.toggleTutorialChapter(1);
    expect(component.isChapterExpanded(1)).toBeFalse();

    component.toggleTutorialChapter(3);
    expect(component.isTutorialGroupExpanded(3)).toBeTrue();
    expect(component.isChapterExpanded(3)).toBeTrue();

    component.toggleTutorialChapter(3);
    expect(component.isChapterExpanded(3)).toBeFalse();
  });

  it('expands the group and chapter named by each supported fragment', () => {
    for (const fragment of [
      'top',
      'chapter-2',
      'chapter-3-content',
      'chapter-4-step-1'
    ]) {
      fragment$.next(fragment);

      const expectedGroup = Number(fragment.match(/chapter-(\d+)/)?.[1] ?? 1);
      expect(component.isTutorialGroupExpanded(expectedGroup)).toBeTrue();
      expect(component.isChapterExpanded(expectedGroup)).toBeTrue();
    }
  });

  it('ignores fragments that do not identify a tutorial group', () => {
    component.selectTutorialChapter(2);

    fragment$.next(null);
    fragment$.next('not-a-tutorial-fragment');

    expect(component.isTutorialGroupExpanded(2)).toBeTrue();
    expect(component.isChapterExpanded(2)).toBeTrue();
  });

  it('leaves expansion state unchanged when the active step has no group', async () => {
    component.selectTutorialChapter(2);

    component.activeStep.set('not-a-tutorial-step');
    await fixture.whenStable();

    expect(component.isTutorialGroupExpanded(2)).toBeTrue();
    expect(component.isChapterExpanded(2)).toBeTrue();
  });

  it('updates the active chapter from the initial child route and navigation', async () => {
    route.firstChild = { snapshot: { url: [{ path: 'chapter-2' }] } };

    // The initial route is read during construction, so create a second instance.
    fixture.destroy();
    fixture = TestBed.createComponent(TutorialAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.isTutorialGroupExpanded(2)).toBeTrue();
    expect(component.isChapterExpanded(2)).toBeTrue();

    route.firstChild = { snapshot: { url: [{ path: 'chapter-3' }] } };
    routerEvents$.next(
      new NavigationEnd(1, '/tutorial/chapter-three', '/tutorial/chapter-three')
    );
    await fixture.whenStable();
    expect(component.isTutorialGroupExpanded(3)).toBeTrue();
    expect(component.isChapterExpanded(3)).toBeTrue();

    route.firstChild = { snapshot: { url: [{ path: 'unknown' }] } };
    routerEvents$.next(
      new NavigationEnd(2, '/tutorial/unknown', '/tutorial/unknown')
    );
    expect(component.isTutorialGroupExpanded(3)).toBeTrue();
  });

  it('ignores router events that are not navigation completions', () => {
    component.selectTutorialChapter(2);
    route.firstChild = { snapshot: { url: [{ path: 'chapter-3' }] } };

    routerEvents$.next({ type: 'NavigationStart' });

    expect(component.isTutorialGroupExpanded(2)).toBeTrue();
  });
});
