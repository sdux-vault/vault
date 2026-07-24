import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import {
  MobileLayoutService,
  sduxTestingModule
} from '@sdux-vault/ui/web-components';
import { EnvironmentTypes } from '../../environments/types/environment.type';
import { FooterComponent } from './footer.component';

describe('Component: Footer', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, sduxTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it('should handle a computed isMobile event', () => {
    const mobileService = TestBed.inject(MobileLayoutService);
    const fakeSignal = signal<boolean>(false);
    spyOn(mobileService, 'isMobile').and.callFake(fakeSignal);

    expect(component.isMobile()).toBeFalse();
    fakeSignal.set(true);

    expect(component.isMobile()).toBeTrue();
  });

  it('should display the current non-enterprise environment above the footer', () => {
    fixture.detectChanges();

    const banner: HTMLElement = fixture.nativeElement.querySelector(
      '.environment-banner'
    );
    const footer: HTMLElement = fixture.nativeElement.querySelector('.footer');
    const styles = getComputedStyle(banner);
    const details = Array.from(
      banner.querySelectorAll<HTMLElement>('.environment-detail')
    ).map((detail) => detail.textContent?.trim());
    const keys = component.environmentDetails.map(({ key }) => key);

    expect(component.environment).toBe(EnvironmentTypes.Development);
    expect(details).toContain('enterprise: false');
    expect(details).toContain('pro: false');
    expect(details).toContain('development: true');
    expect(details).toContain('analyticsEnabled: false');
    expect(details).toContain('api: http://localhost:3101');
    expect(details).toContain('useInMemoryApi: false');
    expect(details).toContain('devMode: true');
    expect(details).toContain('bypassLicensing: false');
    expect(details).toContain('environment: development');
    expect(banner.textContent).not.toContain('license');
    expect(banner.textContent).not.toContain('payload');
    expect(details.length).toBe(9);
    expect(keys).toEqual(
      [...keys].sort((first, second) => first.localeCompare(second))
    );
    expect(banner.offsetHeight).toBe(footer.offsetHeight);
    expect(styles.backgroundColor).toBe('rgb(129, 199, 132)');
    expect(styles.color).toBe('rgb(0, 0, 0)');
    expect(styles.display).toBe('grid');
    expect(styles.gridAutoFlow).toBe('column');
    expect(styles.gridTemplateRows.split(' ').length).toBe(2);
    expect(styles.alignContent).toBe('center');
    expect(styles.justifyContent).toBe('flex-end');
    expect(styles.position).toBe('absolute');
    expect(styles.bottom).toBe(`${footer.offsetHeight}px`);
    expect(styles.zIndex).toBe('1');
  });

  it('should omit the environment banner for enterprise', () => {
    Object.defineProperty(component, 'isEnterprise', { value: true });

    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.environment-banner')
    ).toBeNull();
  });
});
