import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FrameworkPreferenceService } from '../../services/framework-preference.service';
import { FrameworkSelectorComponent } from './framework-selector.component';

describe('FrameworkSelectorComponent', () => {
  let fixture: ComponentFixture<FrameworkSelectorComponent>;
  let component: FrameworkSelectorComponent;
  let preferenceService: FrameworkPreferenceService;

  beforeEach(async () => {
    localStorage.removeItem(FrameworkPreferenceService.STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [FrameworkSelectorComponent, NoopAnimationsModule],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    preferenceService = TestBed.inject(FrameworkPreferenceService);
    fixture = TestBed.createComponent(FrameworkSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    preferenceService.reset();
  });

  it('should render the globe icon button', () => {
    const el: HTMLElement = fixture.nativeElement;
    const button = el.querySelector('.framework-selector-btn');
    expect(button).toBeTruthy();
  });

  it('should default availableFrameworks to all 10 frameworks', () => {
    expect(component.availableFrameworks()).toEqual([
      'Angular',
      'Bun',
      'Deno',
      'Node.js',
      'React',
      'Solid',
      'Svelte',
      'Vanilla JS',
      'Vue',
      'Web Components'
    ]);
  });

  it('should set the preferred framework when select() is called', () => {
    component.select('React');
    expect(preferenceService.preferred()).toBe('React');
  });

  it('should clear the preferred framework when reset() is called', () => {
    component.select('Vue');
    expect(preferenceService.preferred()).toBe('Vue');

    component.reset();
    expect(preferenceService.preferred()).toBeNull();
  });

  it('should render menu items for each available framework', () => {
    const el: HTMLElement = fixture.nativeElement;
    const trigger = el.querySelector<HTMLButtonElement>(
      '.framework-selector-btn'
    );
    trigger?.click();
    fixture.detectChanges();

    const menuItems = document.querySelectorAll('.mat-mdc-menu-item');
    // 10 frameworks + 1 reset button
    expect(menuItems.length).toBe(11);
  });

  it('should show a check icon next to the selected framework', () => {
    component.select('Angular');
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const trigger = el.querySelector<HTMLButtonElement>(
      '.framework-selector-btn'
    );
    trigger?.click();
    fixture.detectChanges();

    const firstMenuItem = document.querySelector('.mat-mdc-menu-item');
    expect(firstMenuItem?.textContent).toContain('check');
    expect(firstMenuItem?.textContent).toContain('Angular');
  });

  it('should render the reset button with restart_alt icon', () => {
    const el: HTMLElement = fixture.nativeElement;
    const trigger = el.querySelector<HTMLButtonElement>(
      '.framework-selector-btn'
    );
    trigger?.click();
    fixture.detectChanges();

    const menuItems = document.querySelectorAll('.mat-mdc-menu-item');
    const resetButton = menuItems[menuItems.length - 1];
    expect(resetButton?.textContent).toContain('Show all (reset)');
    expect(resetButton?.textContent).toContain('restart_alt');
  });
});

describe('FrameworkSelectorComponent with custom availableFrameworks', () => {
  let fixture: ComponentFixture<FrameworkSelectorComponent>;

  beforeEach(async () => {
    localStorage.removeItem(FrameworkPreferenceService.STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [FrameworkSelectorComponent, NoopAnimationsModule],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(FrameworkSelectorComponent);
    fixture.componentRef.setInput('availableFrameworks', ['Angular']);
    fixture.detectChanges();
  });

  it('should render only the provided frameworks in the menu', () => {
    const el: HTMLElement = fixture.nativeElement;
    const trigger = el.querySelector<HTMLButtonElement>(
      '.framework-selector-btn'
    );
    trigger?.click();
    fixture.detectChanges();

    const menuItems = document.querySelectorAll('.mat-mdc-menu-item');
    // 1 framework + 1 reset button
    expect(menuItems.length).toBe(2);
    expect(menuItems[0]?.textContent).toContain('Angular');
    expect(menuItems[1]?.textContent).toContain('Show all (reset)');
  });
});
