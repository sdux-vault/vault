import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { VaultTestingStandardExecutionCaseCommonComponent } from './testing-standard-execution-case.component';

describe('Component: VaultTestingwhyYouMustAwaitCommon', () => {
  let fixture: ComponentFixture<VaultTestingStandardExecutionCaseCommonComponent>;
  let component: VaultTestingStandardExecutionCaseCommonComponent;

  const getText = () => fixture.nativeElement.textContent as string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VaultTestingStandardExecutionCaseCommonComponent,
        sduxTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(
      VaultTestingStandardExecutionCaseCommonComponent
    );
    component = fixture.componentInstance;
  });

  describe('type = "all"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'all');
      fixture.detectChanges();
    });

    it('renders section', () => {
      const text = getText();
      expect(text).toContain('standard application');
      expect(text).not.toContain('effects');
    });
  });

  describe('type = ""', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('renders section', () => {
      const text = getText();
      expect(text).toContain('standard application');
      expect(text).not.toContain('effects');
    });
  });

  // ------------------------------------------------------
  // type = "angular"
  // ------------------------------------------------------

  describe('type = "angular"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'angular');
      fixture.detectChanges();
    });

    it('renders section', () => {
      const text = getText();
      expect(text).not.toContain('standard application');
      expect(text).toContain('effects');
    });
  });

  // ------------------------------------------------------
  // computed signal logic
  // ------------------------------------------------------

  describe('computed signal logic', () => {
    it('isAngular works correctly', () => {
      fixture.componentRef.setInput('type', 'angular');
      expect(component.isAll()).toBeFalse();

      fixture.componentRef.setInput('type', 'angular');
      expect(component.isAngular()).toBeTrue();
    });

    it('default works correctly', () => {
      expect(component.isAll()).toBeTrue();

      expect(component.isAngular()).toBeFalse();
    });

    it('all works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isAll()).toBeTrue();

      fixture.componentRef.setInput('type', 'all');
      expect(component.isAngular()).toBeFalse();
    });
  });
});
