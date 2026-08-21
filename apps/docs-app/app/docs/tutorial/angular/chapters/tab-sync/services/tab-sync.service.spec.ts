import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { TabSyncService } from './tab-sync.service';

describe('Service: Tab Sync', () => {
  let service: TabSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [provideZonelessChangeDetection(), TabSyncService]
    });

    service = TestBed.inject(TabSyncService);
  });

  it('returns the chapter metadata for the tab sync tutorial', () => {
    expect(service.chapters()).toEqual({
      id: 12,
      label: 'Tab Sync',
      fragment: 'chapter-12',
      metadata: {
        track: 'Lab',
        prerequisite: 'Chapter 6',
        tier: '★★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Configure Tab Sync' },
        { id: 2, label: 'View Tab Sync' },
        { id: 3, label: 'Complete Tab Sync Tutorial' }
      ]
    });
  });
});
