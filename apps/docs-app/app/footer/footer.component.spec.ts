import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import {
  MobileLayoutService,
  sduxTestingModule
} from '@sdux-vault/ui/web-components';
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
});
