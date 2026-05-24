import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { VaultArrayMergeCommonComponent } from './array-merge-behaviors.component';

describe('Component: VaultArrayMergeCommon', () => {
  let fixture: ComponentFixture<VaultArrayMergeCommonComponent>;
  let component: VaultArrayMergeCommonComponent;

  const getText = () => fixture.nativeElement.textContent as string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultArrayMergeCommonComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultArrayMergeCommonComponent);
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

    it('renders Array Append Merge section', () => {
      const text = getText();
      expect(text).toContain('Array Append Merge');
      expect(text).toContain(
        'Appends the incoming array to the existing array'
      );
    });

    it('renders Array Merge (Default) section', () => {
      const text = getText();
      expect(text).toContain('Array Merge (Default)');
      expect(text).toContain('Arrays are treated as atomic values');
    });

    it('renders Array Push Merge section', () => {
      const text = getText();
      expect(text).toContain('Array Push Merge');
      expect(text).toContain(
        'Pushes a single incoming value onto the existing array'
      );
    });

    it('renders three tables', () => {
      const tables = fixture.debugElement.queryAll(By.css('table'));
      expect(tables.length).toBe(3);
    });
  });

  // ------------------------------------------------------
  // type = "append"
  // ------------------------------------------------------

  describe('type = "append"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'append');
      fixture.detectChanges();
    });

    it('renders only Array Append Merge', () => {
      const text = getText();
      expect(text).toContain('Array Append Merge');
      expect(text).not.toContain('Array Merge (Default)');
      expect(text).not.toContain('Array Push Merge');
    });

    it('describes append semantics', () => {
      expect(getText()).toContain('returns a new combined array');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // type = "default"
  // ------------------------------------------------------

  describe('type = "default"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'default');
      fixture.detectChanges();
    });

    it('renders only Array Merge (Default)', () => {
      const text = getText();
      expect(text).toContain('Array Merge (Default)');
      expect(text).not.toContain('Array Append Merge');
      expect(text).not.toContain('Array Push Merge');
    });

    it('describes replace semantics', () => {
      const text = getText();
      expect(text).toContain('strategy: replace');
      expect(text).toContain('never merged element-by-element');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // type = "push"
  // ------------------------------------------------------

  describe('type = "push"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'push');
      fixture.detectChanges();
    });

    it('renders only Array Push Merge', () => {
      const text = getText();
      expect(text).toContain('Array Push Merge');
      expect(text).not.toContain('Array Append Merge');
      expect(text).not.toContain('Array Merge (Default)');
    });

    it('describes push semantics', () => {
      const text = getText();
      expect(text).toContain('single incoming value');
      expect(text).toContain('never spread or flattened');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // computed signal logic
  // ------------------------------------------------------

  describe('computed signal logic', () => {
    it('isArrayAppend works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isArrayAppend()).toBeTrue();

      fixture.componentRef.setInput('type', 'append');
      expect(component.isArrayAppend()).toBeTrue();

      fixture.componentRef.setInput('type', 'push');
      expect(component.isArrayAppend()).toBeFalse();
    });

    it('isDefault works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isDefault()).toBeTrue();

      fixture.componentRef.setInput('type', 'default');
      expect(component.isDefault()).toBeTrue();

      fixture.componentRef.setInput('type', 'append');
      expect(component.isDefault()).toBeFalse();
    });

    it('isArrayPush works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isArrayPush()).toBeTrue();

      fixture.componentRef.setInput('type', 'push');
      expect(component.isArrayPush()).toBeTrue();

      fixture.componentRef.setInput('type', 'default');
      expect(component.isArrayPush()).toBeFalse();
    });
  });
});
