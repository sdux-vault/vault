import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { VaultStateBehaviorCommonComponent } from './state-behaviors.component';

describe('Component: VaultStateBehaviorCommonComponent', () => {
  let fixture: ComponentFixture<VaultStateBehaviorCommonComponent>;
  let component: VaultStateBehaviorCommonComponent;

  const getText = () => fixture.nativeElement.textContent as string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultStateBehaviorCommonComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultStateBehaviorCommonComponent);
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

    it('renders Core State Behavior section', () => {
      const text = getText();
      expect(text).toContain('type: core state');
    });

    it('renders Core Emit State section', () => {
      const text = getText();
      expect(text).toContain('type: core emit-state');
    });

    it('renders two tables', () => {
      const tables = fixture.debugElement.queryAll(By.css('table'));
      expect(tables.length).toBe(2);
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

    it('describes core state responsibilities', () => {
      const text = getText();
      expect(text).toContain('type: core state');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // type = "emit"
  // ------------------------------------------------------

  describe('type = "emit"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'emit');
      fixture.detectChanges();
    });

    it('renders only Core Emit State', () => {
      const text = getText();
      expect(text).toContain('withCoreEmitState');
      expect(text).not.toContain('withCoreStateBehavior');
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

      fixture.componentRef.setInput('type', 'emit');
      expect(component.isCore()).toBeFalse();
    });

    it('isEmit works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isEmit()).toBeTrue();

      fixture.componentRef.setInput('type', 'emit');
      expect(component.isEmit()).toBeTrue();

      fixture.componentRef.setInput('type', 'core');
      expect(component.isEmit()).toBeFalse();
    });
  });
});
