import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { EntityAccessBehaviorsCommonComponent } from './entity-access-behaviors.common.component';

describe('Component: EntityAccessBehaviorsCommon', () => {
  let fixture: ComponentFixture<EntityAccessBehaviorsCommonComponent>;
  let component: EntityAccessBehaviorsCommonComponent;

  const getText = () => fixture.nativeElement.textContent as string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityAccessBehaviorsCommonComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EntityAccessBehaviorsCommonComponent);
    component = fixture.componentInstance;
  });

  // ------------------------------------------------------
  // type = "all"
  // ------------------------------------------------------

  describe('type = "all"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'all');
      fixture.detectChanges();
    });

    it('renders Query behavior', () => {
      const text = getText();
      expect(text).toContain('withQueryBehavior');
    });

    it('renders Lookup behavior', () => {
      const text = getText();
      expect(text).toContain('withLookupBehavior');
    });

    it('renders State Cache behavior', () => {
      const text = getText();
      expect(text).toContain('withStateCacheBehavior');
    });

    it('renders three tables', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(3);
    });
  });

  // ------------------------------------------------------
  // type = "query"
  // ------------------------------------------------------

  describe('type = "query"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'query');
      fixture.detectChanges();
    });

    it('renders only Query behavior', () => {
      const text = getText();

      expect(text).toContain('withQueryBehavior');

      expect(text).not.toContain('withLookupBehavior');
      expect(text).not.toContain('withStateCacheBehavior');
    });

    it('describes synchronous entity query semantics', () => {
      const text = getText();

      expect(text).toContain('identifier-based entity querying');
      expect(text).toContain('Queries resolve synchronously');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // type = "lookup"
  // ------------------------------------------------------

  describe('type = "lookup"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'lookup');
      fixture.detectChanges();
    });

    it('renders only Lookup behavior', () => {
      const text = getText();

      expect(text).toContain('withLookupBehavior');

      expect(text).not.toContain('withQueryBehavior');
      expect(text).not.toContain('withStateCacheBehavior');
    });

    it('describes pipeline lookup semantics', () => {
      const text = getText();

      expect(text).toContain('entity lookup through the FeatureCell pipeline');
      expect(text).toContain('pipeline resolution');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // type = "cache"
  // ------------------------------------------------------

  describe('type = "cache"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'cache');
      fixture.detectChanges();
    });

    it('renders only State Cache behavior', () => {
      const text = getText();

      expect(text).toContain('withStateCacheBehavior');

      expect(text).not.toContain('withQueryBehavior');
      expect(text).not.toContain('withLookupBehavior');
    });

    it('describes TTL cache semantics', () => {
      const text = getText();

      expect(text).toContain('TTL-based entity caching');
      expect(text).toContain('controlled pipeline resolution');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // computed signal logic
  // ------------------------------------------------------

  describe('computed signal logic', () => {
    it('isQuery works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isQuery()).toBeTrue();

      fixture.componentRef.setInput('type', 'query');
      expect(component.isQuery()).toBeTrue();

      fixture.componentRef.setInput('type', 'lookup');
      expect(component.isQuery()).toBeFalse();
    });

    it('isLookup works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isLookup()).toBeTrue();

      fixture.componentRef.setInput('type', 'lookup');
      expect(component.isLookup()).toBeTrue();

      fixture.componentRef.setInput('type', 'query');
      expect(component.isLookup()).toBeFalse();
    });

    it('isCache works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isCache()).toBeTrue();

      fixture.componentRef.setInput('type', 'cache');
      expect(component.isCache()).toBeTrue();

      fixture.componentRef.setInput('type', 'lookup');
      expect(component.isCache()).toBeFalse();
    });
  });
});
