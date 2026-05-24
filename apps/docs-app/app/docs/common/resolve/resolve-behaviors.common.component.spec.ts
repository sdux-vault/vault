import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { VaultResolveBehaviorCommonComponent } from './resolve-behaviors.common.component';

describe('Component: VaultResolveBehaviorCommonComponent', () => {
  let fixture: ComponentFixture<VaultResolveBehaviorCommonComponent>;
  let component: VaultResolveBehaviorCommonComponent;

  const getText = () => fixture.nativeElement.textContent as string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultResolveBehaviorCommonComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultResolveBehaviorCommonComponent);
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

    it('renders FromObservable resolution behavior', () => {
      const text = getText();
      expect(text).toContain('withCoreFromObservableBehavior');
    });

    it('renders FromPromise resolution behavior', () => {
      const text = getText();
      expect(text).toContain('withCoreFromPromiseBehavior');
    });

    it('renders FromStream resolution behavior', () => {
      const text = getText();
      expect(text).toContain('withCoreFromStreamBehavior');
    });

    it('renders HttpResource resolution behavior', () => {
      const text = getText();
      expect(text).toContain('withHttpResourceBehavior');
    });

    it('renders Observable resolution behavior', () => {
      const text = getText();
      expect(text).toContain('withCoreObservableBehavior');
    });

    it('renders Promise resolution behavior', () => {
      const text = getText();
      expect(text).toContain('withCorePromiseBehavior');
    });

    it('renders Value resolution behavior', () => {
      const text = getText();
      expect(text).toContain('withCoreValueBehavior');
    });

    it('renders five tables', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(7);
    });
  });

  // ------------------------------------------------------
  // type = "value"
  // ------------------------------------------------------

  describe('type = "value"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'value');
      fixture.detectChanges();
    });

    it('renders only Value behavior', () => {
      const text = getText();
      expect(text).toContain('withCoreValueBehavior');
      expect(text).not.toContain('withCorePromiseBehavior');
      expect(text).not.toContain('withCoreObservableBehavior');
      expect(text).not.toContain('withCoreFromStreamBehavior');
      expect(text).not.toContain('withCoreFromObservableBehavior');
      expect(text).not.toContain('withCoreFromPromiseBehavior');
      expect(text).not.toContain('withHttpResourceBehavior');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // type = "promise"
  // ------------------------------------------------------

  describe('type = "promise"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'promise');
      fixture.detectChanges();
    });

    it('renders only Promise behavior', () => {
      const text = getText();
      expect(text).toContain('withCorePromiseBehavior');
      expect(text).not.toContain('withCoreValueBehavior');
      expect(text).not.toContain('withCoreObservableBehavior');
      expect(text).not.toContain('withCoreFromObservableBehavior');
    });

    it('describes deferred resolution semantics', () => {
      const text = getText();
      expect(text).toContain('deferred factory');
      expect(text).toContain('asynchronous resolution');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // type = "observable"
  // ------------------------------------------------------

  describe('type = "observable"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'observable');
      fixture.detectChanges();
    });

    it('renders only Observable behavior', () => {
      const text = getText();
      expect(text).toContain('withCoreObservableBehavior');
      expect(text).not.toContain('withCorePromiseBehavior');
      expect(text).not.toContain('withCoreValueBehavior');
      expect(text).not.toContain('withCoreFromObservableBehavior');
    });

    it('describes observable resolution semantics', () => {
      const text = getText();
      expect(text).toContain('single emitted value');
      expect(text).toContain('observable-driven resolution');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // type = "fromObservable"
  // ------------------------------------------------------

  describe('type = "fromObservable"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'fromObservable');
      fixture.detectChanges();
    });

    it('renders only fromObservable behavior', () => {
      const text = getText();
      expect(text).toContain('withCoreFromObservableBehavior');
      expect(text).not.toContain('withCoreObservableBehavior');
      expect(text).not.toContain('withCoreValueBehavior');
      expect(text).not.toContain('withCoreFromStreamBehavior');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // type = "fromObservable"
  // ------------------------------------------------------

  describe('type = "fromPromise"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'fromPromise');
      fixture.detectChanges();
    });

    it('renders only fromPromise behavior', () => {
      const text = getText();
      expect(text).toContain('withCoreFromPromiseBehavior');
      expect(text).not.toContain('withCoreFromObservableBehavior');
      expect(text).not.toContain('withCoreObservableBehavior');
      expect(text).not.toContain('withCoreValueBehavior');
      expect(text).not.toContain('withCoreFromStreamBehavior');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // type = "fromStream"
  // ------------------------------------------------------

  describe('type = "fromStream"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'fromStream');
      fixture.detectChanges();
    });

    it('renders only FromStream behavior', () => {
      const text = getText();
      expect(text).toContain('withCoreFromStreamBehavior');
      expect(text).not.toContain('withCoreObservableBehavior');
      expect(text).not.toContain('withCoreValueBehavior');
      expect(text).not.toContain('withCoreFromObservableBehavior');
    });

    it('describes stream integration semantics', () => {
      const text = getText();
      expect(text).toContain('observable-based data sources');
      expect(text).toContain('Resolve stage');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // type = "httpResource"
  // ------------------------------------------------------

  describe('type = "httpResource"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'httpResource');
      fixture.detectChanges();
    });

    it('renders only HttpResource behavior', () => {
      const text = getText();
      expect(text).toContain('withHttpResourceBehavior');
      expect(text).not.toContain('withCoreValueBehavior');
      expect(text).not.toContain('withCorePromiseBehavior');
      expect(text).not.toContain('withCoreFromObservableBehavior');
    });

    it('describes Angular-specific semantics', () => {
      const text = getText();
      expect(text).toContain('Angular');
      expect(text).toContain('experimental feature flag');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // computed signal logic
  // ------------------------------------------------------

  describe('computed signal logic', () => {
    it('isValue works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isValue()).toBeTrue();

      fixture.componentRef.setInput('type', 'value');
      expect(component.isValue()).toBeTrue();

      fixture.componentRef.setInput('type', 'promise');
      expect(component.isValue()).toBeFalse();
    });

    it('isPromise works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isPromiseOption()).toBeTrue();

      fixture.componentRef.setInput('type', 'promise');
      expect(component.isPromiseOption()).toBeTrue();

      fixture.componentRef.setInput('type', 'observable');
      expect(component.isPromiseOption()).toBeFalse();
    });

    it('isObservable works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isObservable()).toBeTrue();

      fixture.componentRef.setInput('type', 'observable');
      expect(component.isObservable()).toBeTrue();

      fixture.componentRef.setInput('type', 'value');
      expect(component.isObservable()).toBeFalse();
    });

    it('isFromObservable works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isFromObservable()).toBeTrue();

      fixture.componentRef.setInput('type', 'fromObservable');
      expect(component.isFromObservable()).toBeTrue();

      fixture.componentRef.setInput('type', 'httpResource');
      expect(component.isFromObservable()).toBeFalse();
    });

    it('isFromPromise works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isFromPromise()).toBeTrue();

      fixture.componentRef.setInput('type', 'fromPromise');
      expect(component.isFromPromise()).toBeTrue();

      fixture.componentRef.setInput('type', 'httpResource');
      expect(component.isFromPromise()).toBeFalse();
    });

    it('isFromStream works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isFromStream()).toBeTrue();

      fixture.componentRef.setInput('type', 'fromStream');
      expect(component.isFromStream()).toBeTrue();

      fixture.componentRef.setInput('type', 'httpResource');
      expect(component.isFromStream()).toBeFalse();
    });

    it('isHttpResource works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isHttpResource()).toBeTrue();

      fixture.componentRef.setInput('type', 'httpResource');
      expect(component.isHttpResource()).toBeTrue();

      fixture.componentRef.setInput('type', 'value');
      expect(component.isHttpResource()).toBeFalse();
    });
    it('isHttpResource works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isHttpResource()).toBeTrue();

      fixture.componentRef.setInput('type', 'httpResource');
      expect(component.isHttpResource()).toBeTrue();

      fixture.componentRef.setInput('type', 'value');
      expect(component.isHttpResource()).toBeFalse();
    });
  });
});
