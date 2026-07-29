import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AnalyticsService,
  sduxTestingModule
} from '@sdux-vault/ui/web-components';
import { StackblitzExampleService } from '../../services/stackblitz-example.service';
import type { StackBlitzExampleShape } from '../../shapes/stackblitz-example.shape';
import { StackblitzLanguageExampleComponent } from './stackblitz-language-example.component';

describe('Component: StackBlitz Example', () => {
  let component: StackblitzLanguageExampleComponent;
  let fixture: ComponentFixture<StackblitzLanguageExampleComponent>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let analyticsSpy: jasmine.SpyObj<AnalyticsService>;
  let serviceSpy: StackblitzExampleService;

  const example: StackBlitzExampleShape = {
    title: 'Replace State',
    id: 'replace-state',
    exampleName: 'replace-example',
    description: 'Replaces the complete FeatureCell state.',
    languages: [{ name: 'Angular', key: 'angular' }]
  };

  beforeEach(async () => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    analyticsSpy = jasmine.createSpyObj('AnalyticsService', [
      'trackStackBlitzInteraction'
    ]);

    await TestBed.configureTestingModule({
      imports: [sduxTestingModule, StackblitzLanguageExampleComponent],
      providers: [
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: AnalyticsService, useValue: analyticsSpy }
      ]
    }).compileComponents();

    serviceSpy = TestBed.inject(StackblitzExampleService);
    spyOn(serviceSpy, 'launchStackblitzExample').and.resolveTo();

    fixture = TestBed.createComponent(StackblitzLanguageExampleComponent);
    fixture.componentRef.setInput('example', example);
    fixture.componentRef.setInput('lang', 'angular');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should copy the shareable URL and show success feedback', async () => {
    spyOn(serviceSpy, 'copyStackBlitzExample').and.returnValue(
      Promise.resolve('angular/replace-example')
    );

    await component.copyStackBlitzExample(example, 'angular');

    expect(serviceSpy.copyStackBlitzExample).toHaveBeenCalledWith(
      example,
      'angular'
    );
    expect(component.copySuccess()).toBe('angular/replace-example');
    expect(snackBarSpy.open).toHaveBeenCalledWith('Link copied!', '', {
      duration: 2000,
      verticalPosition: 'top'
    });
  });

  it('should not track a copy when clipboard writing fails', async () => {
    spyOn(serviceSpy, 'copyStackBlitzExample').and.returnValue(
      Promise.reject(new Error('Clipboard permission denied'))
    );

    await expectAsync(
      component.copyStackBlitzExample(example, 'vue')
    ).toBeRejectedWithError('Clipboard permission denied');

    expect(component.copySuccess()).toBeNull();
  });

  it('should track the selected example and framework when launching', () => {
    component.launchStackblitzExample(example, 'angular');

    expect(serviceSpy.launchStackblitzExample).toHaveBeenCalledOnceWith(
      example,
      'angular'
    );
  });

  it('should clear copy feedback after two seconds', async () => {
    jasmine.clock().install();

    try {
      spyOn(serviceSpy, 'copyStackBlitzExample').and.returnValue(
        Promise.resolve('angular/replace-example')
      );
      await component.copyStackBlitzExample(example, 'angular');

      jasmine.clock().tick(2000);

      expect(component.copySuccess()).toBeNull();
    } finally {
      jasmine.clock().uninstall();
    }
  });

  it('should launch the stackblitz example', async () => {
    component.launchStackblitzExample(
      { ...example, exampleName: 'missing-example' },
      'unknown'
    );

    expect(serviceSpy.launchStackblitzExample).toHaveBeenCalledOnceWith(
      { ...example, exampleName: 'missing-example' },
      'unknown'
    );
  });

  it('should render local-only options without launch or share buttons', () => {
    fixture.componentRef.setInput('example', {
      ...example,
      localOnly: true,
      notice: '<p>Run this example locally.</p>'
    });
    fixture.componentRef.setInput('lang', 'angular');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('button')).toBeNull();
    expect(element.querySelector('img')?.src).toContain(
      'brand/sdux-vault/sdux-symbol.svg'
    );
  });

  it('should getFrameworkIcon', async () => {
    spyOn(serviceSpy, 'getFrameworkIcon').and.returnValue('icon');

    expect(component.getFrameworkIcon('vue')).toBe('icon');
  });
});
