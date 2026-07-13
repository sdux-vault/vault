import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AnalyticsService,
  sduxTestingModule
} from '@sdux-vault/ui/web-components';
import type { StackBlitzExampleShape } from '../shapes/stackblitz-example.shape';
import { StackBlitzExampleComponent } from './stack-blitz-example.component';

describe('Component: StackBlitz Example', () => {
  let component: StackBlitzExampleComponent;
  let fixture: ComponentFixture<StackBlitzExampleComponent>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let analyticsSpy: jasmine.SpyObj<AnalyticsService>;

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
      imports: [sduxTestingModule, StackBlitzExampleComponent],
      providers: [
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: AnalyticsService, useValue: analyticsSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StackBlitzExampleComponent);
    fixture.componentRef.setInput('example', example);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the description and framework controls', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain(example.description);
    expect(element.querySelector('.framework-icon-button')).not.toBeNull();
    expect(element.querySelector('.share-link-button')).not.toBeNull();
    expect(
      element.querySelector('[role="group"]')?.getAttribute('aria-label')
    ).toBe('Replace State framework options');
  });

  it('should resolve and render an example by ID', () => {
    const idFixture = TestBed.createComponent(StackBlitzExampleComponent);
    idFixture.componentRef.setInput('id', 'hydrate-state');
    idFixture.detectChanges();

    const resolved = idFixture.componentInstance.resolvedExample();
    expect(resolved?.exampleName).toBe('hydrate-state-example');
    expect(idFixture.nativeElement.textContent).toContain(
      'deferred factory that supplies the authoritative initial FeatureCell value'
    );
  });

  it('should prefer a directly supplied example when an ID is also provided', () => {
    fixture.componentRef.setInput('id', 'hydrate-state');
    fixture.detectChanges();

    expect(component.resolvedExample()).toBe(example);
    expect(fixture.nativeElement.textContent).toContain(example.description);
  });

  it('should render nothing when neither input is supplied', () => {
    const emptyFixture = TestBed.createComponent(StackBlitzExampleComponent);
    emptyFixture.detectChanges();

    expect(emptyFixture.componentInstance.resolvedExample()).toBeUndefined();
    expect((emptyFixture.nativeElement as HTMLElement).children.length).toBe(0);
  });

  it('should render nothing when the requested ID is unknown', () => {
    const missingFixture = TestBed.createComponent(StackBlitzExampleComponent);
    missingFixture.componentRef.setInput('id', 'missing-example');
    missingFixture.detectChanges();

    expect(missingFixture.componentInstance.resolvedExample()).toBeUndefined();
    expect((missingFixture.nativeElement as HTMLElement).children.length).toBe(
      0
    );
  });

  it('should copy the shareable URL and show success feedback', async () => {
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());

    await component.copyStackBlitzExample(example, 'angular');

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'https://stackblitz.com/github/sdux-vault/stackblitz-examples/tree/main/stackblitz/angular/replace-example'
    );
    expect(component.copySuccess()).toBe('angular/replace-example');
    expect(snackBarSpy.open).toHaveBeenCalledWith('Link copied!', '', {
      duration: 2000,
      verticalPosition: 'top'
    });
    expect(analyticsSpy.trackStackBlitzInteraction).toHaveBeenCalledOnceWith({
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
      component.copyStackBlitzExample(example, 'vue')
    ).toBeRejectedWithError('Clipboard permission denied');

    expect(analyticsSpy.trackStackBlitzInteraction).not.toHaveBeenCalled();
    expect(component.copySuccess()).toBeNull();
  });

  it('should track the selected example and framework when launching', () => {
    spyOn(component, 'openStackBlitzExample').and.resolveTo();

    component.launchStackBlitzExample(example, 'angular');

    expect(analyticsSpy.trackStackBlitzInteraction).toHaveBeenCalledOnceWith({
      exampleId: 'replace-state',
      framework: 'angular',
      action: 'launch'
    });
    expect(component.openStackBlitzExample).toHaveBeenCalledOnceWith(
      example,
      'angular'
    );
  });

  it('should clear copy feedback after two seconds', async () => {
    jasmine.clock().install();

    try {
      spyOn(navigator.clipboard, 'writeText').and.returnValue(
        Promise.resolve()
      );
      await component.copyStackBlitzExample(example, 'angular');

      jasmine.clock().tick(2000);

      expect(component.copySuccess()).toBeNull();
    } finally {
      jasmine.clock().uninstall();
    }
  });

  it('should reject unknown generated projects', async () => {
    await expectAsync(
      component.openStackBlitzExample(
        { ...example, exampleName: 'missing-example' },
        'unknown'
      )
    ).toBeRejectedWithError('Unknown project: unknown/missing-example');
  });

  it('should render local-only options without launch or share buttons', () => {
    fixture.componentRef.setInput('example', {
      ...example,
      localOnly: true,
      notice: '<p>Run this example locally.</p>'
    });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('button')).toBeNull();
    expect(element.textContent).toContain('StackBlitz Limitation');
    expect(element.textContent).toContain('Run this example locally.');
  });
});
