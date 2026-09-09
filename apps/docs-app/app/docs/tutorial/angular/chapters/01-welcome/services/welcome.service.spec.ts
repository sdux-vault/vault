import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { AngularWelcomeService } from './welcome.service';

describe('Service: AngularWelcome', () => {
  let service: AngularWelcomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [provideZonelessChangeDetection(), AngularWelcomeService]
    });

    service = TestBed.inject(AngularWelcomeService);
  });

  it('returns the chapter metadata for the welcome chapter', () => {
    expect(service.chapters()).toEqual({
      id: 1,
      label: 'Welcome',
      route: 'welcome',
      steps: [
        { id: 1, label: 'Before You Begin' },
        { id: 2, label: `The Mock BN Mental Model` },
        Object({ id: 3, label: 'Mock BN in 5 Minutes' })
      ]
    });
  });
});
