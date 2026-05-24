import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { VaultObjectMergeCommonComponent } from './object-merge-behaviors.component';

describe('Component: VaultObjectMergeCommon', () => {
  let fixture: ComponentFixture<VaultObjectMergeCommonComponent>;
  let component: VaultObjectMergeCommonComponent;

  const getText = () => fixture.nativeElement.textContent as string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultObjectMergeCommonComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultObjectMergeCommonComponent);
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

    it('renders Deep Object Merge section', () => {
      const text = getText();
      expect(text).toContain('Deep Object Merge');
      expect(text).toContain('Recursively merges nested plain objects');
    });

    it('renders Shallow Object Merge section', () => {
      const text = getText();
      expect(text).toContain('Shallow Object Merge');
      expect(text).toContain(
        'Performs a one-level merge between two plain objects'
      );
    });

    it('renders exactly two tables', () => {
      const tables = fixture.debugElement.queryAll(By.css('table'));
      expect(tables.length).toBe(2);
    });
  });

  // ------------------------------------------------------
  // type = "deep"
  // ------------------------------------------------------

  describe('type = "deep"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'deep');
      fixture.detectChanges();
    });

    it('renders only Deep Object Merge', () => {
      const text = getText();
      expect(text).toContain('Deep Object Merge');
      expect(text).not.toContain('Shallow Object Merge');
    });

    it('describes recursive merge semantics', () => {
      const text = getText();
      expect(text).toContain('Recursively merges nested plain objects');
      expect(text).toContain('nested plain objects');
    });

    it('renders exactly one table', () => {
      const tables = fixture.debugElement.queryAll(By.css('table'));
      expect(tables.length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // type = "shallow"
  // ------------------------------------------------------

  describe('type = "shallow"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'shallow');
      fixture.detectChanges();
    });

    it('renders only Shallow Object Merge', () => {
      const text = getText();
      expect(text).toContain('Shallow Object Merge');
      expect(text).not.toContain('Deep Object Merge');
    });

    it('describes shallow merge semantics', () => {
      const text = getText();
      expect(text).toContain(
        'Performs a one-level merge between two plain objects'
      );
      expect(text).toContain('one-level merge');
    });

    it('renders exactly one table', () => {
      const tables = fixture.debugElement.queryAll(By.css('table'));
      expect(tables.length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // computed signal logic
  // ------------------------------------------------------

  describe('computed signals', () => {
    it('isDeep behaves correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isDeep()).toBeTrue();

      fixture.componentRef.setInput('type', 'deep');
      expect(component.isDeep()).toBeTrue();

      fixture.componentRef.setInput('type', 'shallow');
      expect(component.isDeep()).toBeFalse();
    });

    it('isShallow behaves correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isShallow()).toBeTrue();

      fixture.componentRef.setInput('type', 'shallow');
      expect(component.isShallow()).toBeTrue();

      fixture.componentRef.setInput('type', 'deep');
      expect(component.isShallow()).toBeFalse();
    });
  });
});
