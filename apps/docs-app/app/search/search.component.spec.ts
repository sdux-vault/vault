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
        docLink: 'functions'
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
      url: 'url'
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
});
