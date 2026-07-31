import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  AnalyticsService,
  sduxTestingModule
} from '@sdux-vault/ui/web-components';
import { StackBlitzExampleShape } from '../shapes/stackblitz-example.shape';
import { StackblitzExampleService } from './stackblitz-example.service';

describe('Service: StackblitzExampleService', () => {
  let service: StackblitzExampleService;
  let analyticsSpy: jasmine.SpyObj<any>;

  const example: StackBlitzExampleShape = {
    title: 'Replace State',
    id: 'replace-state',
    displayCopyIcon: true,
    exampleName: 'replace-example',
    description: 'Replaces the complete FeatureCell state.',
    languages: [{ name: 'Angular', key: 'angular' }]
  };

  beforeEach(async () => {
    analyticsSpy = jasmine.createSpyObj('AnalyticsService', [
      'trackStackblitzInteraction'
    ]);

    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [
        provideZonelessChangeDetection(),
        { provide: AnalyticsService, useValue: analyticsSpy }
      ]
    });
    service = TestBed.inject(StackblitzExampleService);
  });

  it('should return the correct icon for a known framework', () => {
    expect(service.getFrameworkIcon('angular')).toBe(
      'assets/brand/angular/angular-icon.png'
    );
    expect(service.getFrameworkIcon('react')).toBe(
      'assets/brand/react/react-icon.svg'
    );
    expect(service.getFrameworkIcon('vue')).toBe(
      'assets/brand/vue/vue-icon.svg'
    );
    expect(service.getFrameworkIcon('svelte')).toBe(
      'assets/brand/svelte/svelte-icon.svg'
    );
    expect(service.getFrameworkIcon('unknown')).toBe(
      'assets/brand/sdux-vault/sdux-symbol.svg'
    );
  });

  it('should return the correct example for a given id', () => {
    expect(service.getExample('replace-state')).toEqual(
      Object({
        description:
          'Demonstrates <strong>replaceState</strong> — the simplest way to update a FeatureCell. The entire previous state is discarded and replaced with the new value in a single atomic operation. Choose your framework and launch the example directly in StackBlitz.',
        title: 'Replace State',
        displayCopyIcon: true,
        id: 'replace-state',
        exampleName: 'replace-example',
        languages: [
          Object({ name: 'Angular', key: 'angular' }),
          Object({ name: 'React', key: 'react' }),
          Object({ name: 'Svelte', key: 'svelte' }),
          Object({ name: 'Vue', key: 'vue' })
        ]
      })
    );
    expect(service.getExample('non-existent-id')).toBeUndefined();
  });

  describe('copyStackBlitzExample', () => {
    it('should copy the shareable URL and show success feedback', async () => {
      spyOn(navigator.clipboard, 'writeText').and.returnValue(
        Promise.resolve()
      );

      expect(await service.copyStackBlitzExample(example, 'angular')).toBe(
        'angular/replace-example'
      );

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'https://stackblitz.com/github/sdux-vault/stackblitz-examples/tree/main/stackblitz/angular/replace-example'
      );
      expect(analyticsSpy.trackStackblitzInteraction).toHaveBeenCalledOnceWith({
        exampleId: 'replace-state',
        framework: 'angular',
        action: 'copy'
      });
    });

    it('should not track a copy when clipboard writing fails', async () => {
      spyOn(navigator.clipboard, 'writeText').and.returnValue(
        Promise.reject(new Error('Clipboard permission denied'))
      );

      await expectAsync(
        service.copyStackBlitzExample(example, 'vue')
      ).toBeRejectedWithError('Clipboard permission denied');

      expect(analyticsSpy.trackStackblitzInteraction).not.toHaveBeenCalled();
    });
  });

  it('should track the selected example and framework when launching', () => {
    service.launchStackblitzExample(example, 'angular');

    expect(analyticsSpy.trackStackblitzInteraction).toHaveBeenCalledOnceWith({
      exampleId: 'replace-state',
      framework: 'angular',
      action: 'launch'
    });
  });
});
