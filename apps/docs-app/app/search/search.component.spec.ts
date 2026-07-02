import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { SearchComponent } from './search.component';
import { SearchService } from './service/search.service';
import { SearchResultShape } from './shapes/search-result.shape';

class MockSearchService {
  search = jasmine.createSpy('search').and.callFake(() =>
    Promise.resolve([
      {
        id: 'fn:replaceState',
        title: 'replaceState',
        kind: 'function',
        project: 'core',
        docLink: 'functions',
        description: 'Replaces the current state snapshot.'
      } as SearchResultShape
    ])
  );
}

class MockRouter {
  navigateByUrl = jasmine.createSpy('navigateByUrl');
}

describe('Component: Search', () => {
  let fixture: ComponentFixture<SearchComponent>;
  let component: SearchComponent;
  let mockSearch: MockSearchService;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, MatIconModule, sduxTestingModule],
      providers: [
        provideZonelessChangeDetection(),
        { provide: SearchService, useClass: MockSearchService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

    mockSearch = TestBed.inject(SearchService) as unknown as MockSearchService;
    mockRouter = TestBed.inject(Router) as unknown as MockRouter;

    fixture.detectChanges();
  });

  // ---------------------------------------------------------
  // 1. ViewChild wiring
  // ---------------------------------------------------------
  it('should create component and wire searchInput ViewChild', () => {
    expect(component.searchInput).toBeTruthy();
  });

  // ---------------------------------------------------------
  // 2. focusInput() should call nativeElement.focus()
  // ---------------------------------------------------------
  it('should call focus on input when focusInput() is triggered', () => {
    const inputEl = component.searchInput.nativeElement;
    spyOn(inputEl, 'focus');

    component.focusInput();

    expect(inputEl.focus).toHaveBeenCalled();
  });

  // ---------------------------------------------------------
  // 3. onQueryChange() triggers search and updates signals
  // ---------------------------------------------------------
  it('should update query signal and populate results from SearchService', async () => {
    expect(component.results()).toEqual([]);

    await component.onQueryChange('replace');

    expect(component.query()).toBe('replace');
    expect(mockSearch.search).toHaveBeenCalledWith('replace');
    expect(component.results().length).toBe(1);
    expect(component.results()[0].title).toBe('replaceState');
  });

  it('should build the project', async () => {
    expect(component.buildProject('project-name')).toBe(
      '@mock bn/project-name'
    );
  });

  it('should return "blog" for blog project', () => {
    expect(component.buildProject('blog')).toBe('blog');
  });

  // ---------------------------------------------------------
  // 4. updatePosition() computes geometry correctly
  // ---------------------------------------------------------
  it('should compute dropdownLeft correctly based on input rect', () => {
    const mockRect = {
      left: 100,
      width: 200
    } as DOMRect;

    spyOn(
      component.searchInput.nativeElement,
      'getBoundingClientRect'
    ).and.returnValue(mockRect);

    component.updatePosition();

    // left + width - 320
    expect(component.dropdownLeft()).toBe(-20);
  });

  // ---------------------------------------------------------
  // 5. ngAfterViewInit() installs resize listener + calls updatePosition()
  // ---------------------------------------------------------
  it('should call updatePosition() during ngAfterViewInit()', () => {
    spyOn(component, 'updatePosition');

    component.ngAfterViewInit();

    expect(component.updatePosition).toHaveBeenCalled();
  });

  // ---------------------------------------------------------
  // 6. goTo() should route and reset UI state
  // ---------------------------------------------------------
  it('should route to the correct doc URL and reset UI state', () => {
    const mockResult: SearchResultShape = {
      id: 'fn:replaceState',
      title: 'replaceState',
      kind: 'function',
      project: 'core',
      docLink: 'functions',
      url: 'url',
      description: 'Replaces the current state snapshot.'
    };

    // pre-populate state
    component.query.set('abc');
    component.results.set([mockResult]);
    component.focused.set(true);

    component.goTo(mockResult);

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('url');

    // UI cleared
    expect(component.query()).toBe('');
    expect(component.results()).toEqual([]);
    expect(component.focused()).toBeFalse();
  });

  it('should handle a resize without a searchInput', () => {
    (component as any).searchInput = undefined;
    window.dispatchEvent(new Event('resize'));
    expect(component.dropdownLeft()).toEqual(jasmine.any(Number));
  });

  // ---------------------------------------------------------
  // 7. Keyboard navigation
  // ---------------------------------------------------------
  describe('keyboard navigation', () => {
    const mockResults: SearchResultShape[] = [
      {
        id: 'fn:a',
        title: 'Alpha',
        kind: 'function',
        project: 'core',
        docLink: 'functions',
        url: '/a',
        description: 'Alpha function.'
      },
      {
        id: 'fn:b',
        title: 'Beta',
        kind: 'function',
        project: 'core',
        docLink: 'functions',
        url: '/b',
        description: 'Beta function.'
      },
      {
        id: 'fn:c',
        title: 'Gamma',
        kind: 'function',
        project: 'core',
        docLink: 'functions',
        url: '/c',
        description: 'Gamma function.'
      }
    ];

    function keydown(key: string): void {
      component.onKeydown(new KeyboardEvent('keydown', { key }));
    }

    beforeEach(() => {
      component.results.set(mockResults);
      component.activeIndex.set(-1);
    });

    it('ArrowDown should advance activeIndex', () => {
      keydown('ArrowDown');
      expect(component.activeIndex()).toBe(0);

      keydown('ArrowDown');
      expect(component.activeIndex()).toBe(1);
    });

    it('ArrowDown should wrap to the beginning', () => {
      component.activeIndex.set(2);

      keydown('ArrowDown');
      expect(component.activeIndex()).toBe(0);
    });

    it('ArrowUp should move activeIndex backward', () => {
      component.activeIndex.set(2);

      keydown('ArrowUp');
      expect(component.activeIndex()).toBe(1);
    });

    it('ArrowUp should wrap to the end from the beginning', () => {
      component.activeIndex.set(0);

      keydown('ArrowUp');
      expect(component.activeIndex()).toBe(2);
    });

    it('ArrowUp from -1 should wrap to the last item', () => {
      keydown('ArrowUp');
      expect(component.activeIndex()).toBe(2);
    });

    it('Enter should navigate to the active result', () => {
      component.activeIndex.set(1);

      keydown('Enter');

      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/b');
      expect(component.query()).toBe('');
      expect(component.results()).toEqual([]);
    });

    it('Enter should do nothing when no item is active', () => {
      keydown('Enter');

      expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
    });

    it('Escape should clear query, results, and activeIndex', () => {
      component.query.set('test');
      component.activeIndex.set(1);

      keydown('Escape');

      expect(component.query()).toBe('');
      expect(component.results()).toEqual([]);
      expect(component.activeIndex()).toBe(-1);
    });

    it('Escape should close search even with no results', () => {
      component.results.set([]);
      component.query.set('xyz');
      const blurSpy = spyOn(component.searchInput.nativeElement, 'blur');

      keydown('Escape');

      expect(component.query()).toBe('');
      expect(blurSpy).toHaveBeenCalled();
    });

    it('onQueryChange should reset activeIndex', async () => {
      component.activeIndex.set(2);

      await component.onQueryChange('new query');

      expect(component.activeIndex()).toBe(-1);
    });

    it('should not change activeIndex when results are empty', () => {
      component.results.set([]);

      keydown('ArrowDown');
      expect(component.activeIndex()).toBe(-1);

      keydown('ArrowUp');
      expect(component.activeIndex()).toBe(-1);
    });

    describe('tooltip on arrow keys', () => {
      beforeEach(async () => {
        component.query.set('test');
        component.focused.set(true);
        fixture.detectChanges();
        await fixture.whenStable();
      });

      it('ArrowDown should show tooltip on the active result', () => {
        const tooltips = component.tooltips.toArray();
        const showSpies = tooltips.map((t) => spyOn(t, 'show'));
        const hideSpies = tooltips.map((t) => spyOn(t, 'hide'));

        keydown('ArrowDown');

        for (const spy of hideSpies) {
          expect(spy).toHaveBeenCalled();
        }
        expect(showSpies[0]).toHaveBeenCalled();
      });

      it('ArrowUp should show tooltip on the active result', () => {
        const tooltips = component.tooltips.toArray();
        const showSpies = tooltips.map((t) => spyOn(t, 'show'));
        const hideSpies = tooltips.map((t) => spyOn(t, 'hide'));

        keydown('ArrowUp');

        for (const spy of hideSpies) {
          expect(spy).toHaveBeenCalled();
        }
        expect(showSpies[2]).toHaveBeenCalled();
      });

      it('should hide all tooltips then show only the active one', () => {
        const tooltips = component.tooltips.toArray();
        const showSpies = tooltips.map((t) => spyOn(t, 'show'));
        const hideSpies = tooltips.map((t) => spyOn(t, 'hide'));

        keydown('ArrowDown');
        keydown('ArrowDown');

        for (const spy of hideSpies) {
          expect(spy).toHaveBeenCalledTimes(2);
        }
        expect(showSpies[1]).toHaveBeenCalled();
      });

      it('should handle arrow keys when tooltips QueryList is undefined', () => {
        (component as any).tooltips = undefined;

        expect(() => keydown('ArrowDown')).not.toThrow();
        expect(component.activeIndex()).toBe(0);
      });
    });
  });

  // ---------------------------------------------------------
  // 8. Highlight match
  // ---------------------------------------------------------
  describe('highlightMatch', () => {
    it('should wrap matching substring in a mark element', () => {
      component.query.set('Alpha');
      const result = component.highlightMatch('Alpha');
      expect(result).toBe('<mark class="highlight">Alpha</mark>');
    });

    it('should be case-insensitive', () => {
      component.query.set('alpha');
      const result = component.highlightMatch('Alpha');
      expect(result).toBe('<mark class="highlight">Alpha</mark>');
    });

    it('should highlight partial matches', () => {
      component.query.set('State');
      const result = component.highlightMatch('replaceState');
      expect(result).toBe('replace<mark class="highlight">State</mark>');
    });

    it('should highlight multiple occurrences', () => {
      component.query.set('a');
      const result = component.highlightMatch('Alpha');
      expect(result).toBe(
        '<mark class="highlight">A</mark>lph<mark class="highlight">a</mark>'
      );
    });

    it('should return the title unchanged when query is empty', () => {
      component.query.set('');
      const result = component.highlightMatch('Alpha');
      expect(result).toBe('Alpha');
    });

    it('should return the title unchanged when there is no match', () => {
      component.query.set('xyz');
      const result = component.highlightMatch('Alpha');
      expect(result).toBe('Alpha');
    });

    it('should handle regex special characters in query', () => {
      component.query.set('state()');
      const result = component.highlightMatch('replaceState()');
      expect(result).toBe('replace<mark class="highlight">State()</mark>');
    });
  });

  // ---------------------------------------------------------
  // 9. Global / shortcut
  // ---------------------------------------------------------
  describe('/ keyboard shortcut', () => {
    it('should focus the search input when / is pressed', () => {
      spyOn(component, 'focusInput');

      window.dispatchEvent(new KeyboardEvent('keydown', { key: '/' }));

      expect(component.focusInput).toHaveBeenCalled();
    });

    it('should not focus when / is pressed inside an input element', () => {
      spyOn(component, 'focusInput');

      const input = document.createElement('input');
      document.body.appendChild(input);
      input.focus();

      input.dispatchEvent(
        new KeyboardEvent('keydown', { key: '/', bubbles: true })
      );

      expect(component.focusInput).not.toHaveBeenCalled();
      document.body.removeChild(input);
    });

    it('should not focus when / is pressed inside a textarea', () => {
      spyOn(component, 'focusInput');

      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      textarea.focus();

      textarea.dispatchEvent(
        new KeyboardEvent('keydown', { key: '/', bubbles: true })
      );

      expect(component.focusInput).not.toHaveBeenCalled();
      document.body.removeChild(textarea);
    });

    it('should not focus when search is already focused', () => {
      component.focused.set(true);
      spyOn(component, 'focusInput');

      window.dispatchEvent(new KeyboardEvent('keydown', { key: '/' }));

      expect(component.focusInput).not.toHaveBeenCalled();
    });

    it('should ignore non-/ keys', () => {
      spyOn(component, 'focusInput');

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

      expect(component.focusInput).not.toHaveBeenCalled();
    });
  });
});
