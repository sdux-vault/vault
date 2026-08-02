import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { StateIntrospectionService } from './state-introspection.service';

describe('Service: State Introspection', () => {
  let service: StateIntrospectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [provideZonelessChangeDetection(), StateIntrospectionService]
    });

    service = TestBed.inject(StateIntrospectionService);
  });

  it('returns the chapter metadata for the state introspection tutorial', () => {
    expect(service.chapters()).toEqual({
      id: 11,
      label: 'State Introspection Chapter',
      fragment: 'chapter-11',
      steps: [
        { id: 1, label: 'Read Raw StateSnapshot' },
        { id: 2, label: 'Observe Raw StateSnapshot$' },
        { id: 3, label: 'Inspect Before Taps' },
        { id: 4, label: 'Inspect After Taps' },
        { id: 5, label: 'Observe State Emission' },
        { id: 6, label: 'Capture Initial State' },
        { id: 7, label: 'Complete State Introspection Tutorial' }
      ]
    });
  });
});
