import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { VaultPersistBehaviorsCommonComponent } from './persist-behaviors.component';

describe('Component: VaultPersistBehaviorsCommon', () => {
  let fixture: ComponentFixture<VaultPersistBehaviorsCommonComponent>;
  let component: VaultPersistBehaviorsCommonComponent;

  const getText = () => fixture.nativeElement.textContent as string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultPersistBehaviorsCommonComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultPersistBehaviorsCommonComponent);
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

    it('renders Cookie Storage section', () => {
      const text = getText();
      expect(text).toContain('Cookie Storage');
      expect(text).toContain('withCookieStoragePersistBehavior');
      expect(text).toContain('document.cookie');
    });

    it('renders Local Storage section', () => {
      const text = getText();
      expect(text).toContain('Local Storage');
      expect(text).toContain('withLocalStoragePersistBehavior');
      expect(text).toContain('localStorage');
    });

    it('renders Session Storage section', () => {
      const text = getText();
      expect(text).toContain('Session Storage');
      expect(text).toContain('withSessionStoragePersistBehavior');
      expect(text).toContain('sessionStorage');
    });

    it('renders exactly three tables', () => {
      const tables = fixture.debugElement.queryAll(By.css('table'));
      expect(tables.length).toBe(3);
    });
  });

  // ------------------------------------------------------
  // type = "cookie"
  // ------------------------------------------------------

  describe('type = "cookie"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'cookie');
      fixture.detectChanges();
    });

    it('renders only Cookie Storage', () => {
      const text = getText();
      expect(text).toContain('Cookie Storage');
      expect(text).toContain('withCookieStoragePersistBehavior');

      expect(text).not.toContain('Local Storage');
      expect(text).not.toContain('Session Storage');
    });

    it('renders exactly one table', () => {
      const tables = fixture.debugElement.queryAll(By.css('table'));
      expect(tables.length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // type = "local"
  // ------------------------------------------------------

  describe('type = "local"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'local');
      fixture.detectChanges();
    });

    it('renders only Local Storage', () => {
      const text = getText();
      expect(text).toContain('Local Storage');
      expect(text).toContain('withLocalStoragePersistBehavior');

      expect(text).not.toContain('Cookie Storage');
      expect(text).not.toContain('Session Storage');
    });

    it('describes localStorage semantics', () => {
      const text = getText();
      expect(text).toContain('localStorage');
      expect(text).toContain('JSON.stringify');
    });

    it('renders exactly one table', () => {
      const tables = fixture.debugElement.queryAll(By.css('table'));
      expect(tables.length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // type = "session"
  // ------------------------------------------------------

  describe('type = "session"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'session');
      fixture.detectChanges();
    });

    it('renders only Session Storage', () => {
      const text = getText();
      expect(text).toContain('Session Storage');
      expect(text).toContain('withSessionStoragePersistBehavior');

      expect(text).not.toContain('Cookie Storage');
      expect(text).not.toContain('Local Storage');
    });

    it('describes sessionStorage semantics', () => {
      const text = getText();
      expect(text).toContain('sessionStorage');
      expect(text).toContain('browser tab');
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
    it('isCookie behaves correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isCookie()).toBeTrue();

      fixture.componentRef.setInput('type', 'cookie');
      expect(component.isCookie()).toBeTrue();

      fixture.componentRef.setInput('type', 'local');
      expect(component.isCookie()).toBeFalse();

      fixture.componentRef.setInput('type', 'session');
      expect(component.isCookie()).toBeFalse();
    });

    it('isLocal behaves correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isLocal()).toBeTrue();

      fixture.componentRef.setInput('type', 'local');
      expect(component.isLocal()).toBeTrue();

      fixture.componentRef.setInput('type', 'cookie');
      expect(component.isLocal()).toBeFalse();

      fixture.componentRef.setInput('type', 'session');
      expect(component.isLocal()).toBeFalse();
    });

    it('isSession behaves correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isSession()).toBeTrue();

      fixture.componentRef.setInput('type', 'session');
      expect(component.isSession()).toBeTrue();

      fixture.componentRef.setInput('type', 'cookie');
      expect(component.isSession()).toBeFalse();

      fixture.componentRef.setInput('type', 'local');
      expect(component.isSession()).toBeFalse();
    });
  });
});
