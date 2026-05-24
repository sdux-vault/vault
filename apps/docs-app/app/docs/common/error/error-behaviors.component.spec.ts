import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { VaultErrorBehaviorCommonComponent } from './error-behaviors.component';

describe('Component: VaultErrorBehaviorCommonComponent', () => {
  let fixture: ComponentFixture<VaultErrorBehaviorCommonComponent>;
  let component: VaultErrorBehaviorCommonComponent;

  const getText = () => fixture.nativeElement.textContent as string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultErrorBehaviorCommonComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultErrorBehaviorCommonComponent);
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

    it('renders Core Error Behavior section', () => {
      const text = getText();
      expect(text).toContain('withCoreErrorBehavior');
    });

    it('renders Error Callback Behavior section', () => {
      const text = getText();
      expect(text).toContain('withCoreErrorCallbackBehavior');
    });

    it('renders Error Transform Behavior section', () => {
      const text = getText();
      expect(text).toContain('withErrorTransformBehavior');
    });

    it('renders three tables', () => {
      const tables = fixture.debugElement.queryAll(By.css('table'));
      expect(tables.length).toBe(3);
    });
  });

  // ------------------------------------------------------
  // type = "core"
  // ------------------------------------------------------

  describe('type = "core"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'core');
      fixture.detectChanges();
    });

    it('renders only Core Error Behavior', () => {
      const text = getText();
      expect(text).toContain('withCoreErrorBehavior');
      expect(text).toContain('type: core error');

      expect(text).not.toContain('withCoreErrorCallbackBehavior');
      expect(text).not.toContain('withErrorTransformBehavior');
    });

    it('describes core error normalization', () => {
      const text = getText();
      expect(text).toContain('converts any thrown or rejected value');
      expect(text).toContain('consistent error shape');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // type = "callback"
  // ------------------------------------------------------

  describe('type = "callback"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'callback');
      fixture.detectChanges();
    });

    it('renders only Error Callback Behavior', () => {
      const text = getText();
      expect(text).toContain('withCoreErrorCallbackBehavior');
      expect(text).not.toContain('withCoreErrorBehavior');
      expect(text).not.toContain('withErrorTransformBehavior');
    });

    it('describes callback semantics', () => {
      const text = getText();
      expect(text).toContain('callback-style error handlers');
      expect(text).toContain('never transforms the error');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // type = "transform"
  // ------------------------------------------------------

  describe('type = "transform"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'transform');
      fixture.detectChanges();
    });

    it('renders only Error Transform Behavior', () => {
      const text = getText();
      expect(text).toContain('withErrorTransformBehavior');
      expect(text).not.toContain('withCoreErrorBehavior');
      expect(text).not.toContain('withCoreErrorCallbackBehavior');
    });

    it('describes transform contract semantics', () => {
      const text = getText();
      expect(text).toContain('may transform the current');
      expect(text).toContain('must not throw');
      expect(text).toContain('must not mutate state');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // computed signal logic
  // ------------------------------------------------------

  describe('computed signal logic', () => {
    it('isCore works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isCore()).toBeTrue();

      fixture.componentRef.setInput('type', 'core');
      expect(component.isCore()).toBeTrue();

      fixture.componentRef.setInput('type', 'callback');
      expect(component.isCore()).toBeFalse();
    });

    it('isCallback works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isCallback()).toBeTrue();

      fixture.componentRef.setInput('type', 'callback');
      expect(component.isCallback()).toBeTrue();

      fixture.componentRef.setInput('type', 'core');
      expect(component.isCallback()).toBeFalse();
    });

    it('isTransform works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isTransform()).toBeTrue();

      fixture.componentRef.setInput('type', 'transform');
      expect(component.isTransform()).toBeTrue();

      fixture.componentRef.setInput('type', 'core');
      expect(component.isTransform()).toBeFalse();
    });
  });
});
