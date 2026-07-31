import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import Prism from 'prismjs';
import { MobileLayoutService } from '../../services/mobile-layout.service';
import { ExampleViewerTabComponent } from '../example-viewer-tab/example-viewer-source-tab.component';
import { ExampleViewerService } from '../services/example-viewer.service';
import { ExampleViewerSourceComponent } from './example-viewer-source.component';

@Component({
  selector: 'sdux-dynamic-example-viewer-test',
  standalone: true,
  imports: [ExampleViewerSourceComponent, ExampleViewerTabComponent],
  template: `
    <sdux-example-viewer-source [displayTabs]="false">
      @for (file of files; track file.fileName) {
        <sdux-example-viewer-tab [label]="file.fileName">
          <pre
            class="code-inline"><code class="language-ts">{{ file.source }}</code></pre>
        </sdux-example-viewer-tab>
      }
    </sdux-example-viewer-source>
  `
})
class DynamicExampleViewerTestComponent {
  readonly files = [
    {
      fileName: 'example.component.ts',
      source: `export class ExampleComponent {
  readonly value = true;
}`
    },
    {
      fileName: 'example.service.ts',
      source: `export class ExampleService {
  getValue(): boolean {
    return true;
  }
}`
    }
  ];
}

describe('ExampleViewerSourceComponent', () => {
  let fixture: ComponentFixture<ExampleViewerSourceComponent>;
  let component: ExampleViewerSourceComponent;

  let exampleViewerService: jasmine.SpyObj<ExampleViewerService>;
  let snack: jasmine.SpyObj<MatSnackBar>;

  beforeAll(() => {
    jasmine.clock().install();
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  beforeEach(async () => {
    exampleViewerService = jasmine.createSpyObj('ExampleViewerService', [
      'setDefaultVisibility',
      'toggle'
    ]);

    snack = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        ExampleViewerSourceComponent,
        DynamicExampleViewerTestComponent
      ],
      providers: [
        { provide: ExampleViewerService, useValue: exampleViewerService },
        { provide: MatSnackBar, useValue: snack },
        MobileLayoutService,
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleViewerSourceComponent);
    component = fixture.componentInstance;

    // Fake clipboard
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());

    fixture.detectChanges();
  });

  // ───────────────────────────────────────────────
  // copyCode() tests
  // ───────────────────────────────────────────────

  it('should copy code and show success snackbar', async () => {
    const blocks = [{ nativeElement: { innerText: '"A"' } }];

    component.codeBlocks = {
      get: () => blocks[0]
    } as any;

    component.copyCode(0);

    // Clipboard called
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('"A"');

    // Snackbar called
    await Promise.resolve();
    expect(component.copySuccess()).toBeTrue();

    jasmine.clock().tick(2000);
    expect(snack.open).toHaveBeenCalledWith('Source copied!', '', {
      duration: 2000,
      verticalPosition: 'top'
    });

    // copySuccess toggled

    // Fast-forward 2 seconds
    jasmine.clock().tick(2000);
    expect(component.copySuccess()).toBeFalse();
  });

  it('should warn when no text to copy', () => {
    component.codeBlocks = {
      get: () => ({ nativeElement: { innerText: '' } })
    } as any;

    component.copyCode(0);

    jasmine.clock().tick(2000);

    expect(snack.open).toHaveBeenCalledWith('Nothing to copy!', '', {
      duration: 1500,
      verticalPosition: 'top'
    });
  });

  it('should do nothing if index is out of bounds', () => {
    component.codeBlocks = { get: () => undefined } as any;

    component.copyCode(0);

    expect(snack.open).toHaveBeenCalledWith('Nothing to copy!', '', {
      duration: 1500,
      verticalPosition: 'top'
    });
  });

  it('should call setDefaultVisibility when exampleId is provided', () => {
    // GIVEN: exampleId and displayExamples are provided as inputs
    fixture.componentRef.setInput('exampleId', 'ex-123');
    fixture.componentRef.setInput('displayExamples', true);

    // WHEN: change detection runs (effect executes in constructor)
    fixture.detectChanges();

    // THEN: service should have been called
    expect(exampleViewerService.setDefaultVisibility).toHaveBeenCalledWith(
      'ex-123',
      true
    );
  });

  it('should preserve and highlight multiline source rendered by @for', async () => {
    const highlightedSources: string[] = [];
    spyOn(Prism, 'highlightElement').and.callFake((element) => {
      highlightedSources.push(element.textContent?.trim() ?? '');
    });

    const dynamicFixture = TestBed.createComponent(
      DynamicExampleViewerTestComponent
    );
    dynamicFixture.detectChanges();
    await dynamicFixture.whenStable();
    dynamicFixture.detectChanges();

    const expectedSources = dynamicFixture.componentInstance.files.map(
      ({ source }) => source
    );
    const renderedSources = Array.from(
      dynamicFixture.nativeElement.querySelectorAll(
        'pre.view-code-inline > code'
      ) as NodeListOf<HTMLElement>
    ).map(({ textContent }) => textContent?.trim() ?? '');

    expect(renderedSources).toEqual(expectedSources);
    expect(highlightedSources).toEqual(expectedSources);
  });

  it('should mark panes as overflowing only when they exceed the max height', () => {
    component.sourcePanes = {
      toArray: () => [
        { nativeElement: { scrollHeight: 800 } },
        { nativeElement: { scrollHeight: 320 } }
      ]
    } as any;

    fixture.componentRef.setInput('sourcePaneMaxHeight', 640);
    fixture.detectChanges();

    (component as any).updateOverflowState();

    expect(component.isSourceOverflowing(0)).toBeTrue();
    expect(component.isSourceOverflowing(1)).toBeFalse();
    expect(component.isSourceCollapsed(0)).toBeTrue();
    expect(component.isSourceCollapsed(1)).toBeFalse();
  });

  it('should toggle expanded state per overflowing pane', () => {
    component.overflowingTabs.set({ 0: true });

    expect(component.isSourceCollapsed(0)).toBeTrue();

    component.toggleSourceExpansion(0);
    expect(component.isSourceExpanded(0)).toBeTrue();
    expect(component.isSourceCollapsed(0)).toBeFalse();

    component.toggleSourceExpansion(0);
    expect(component.isSourceExpanded(0)).toBeFalse();
    expect(component.isSourceCollapsed(0)).toBeTrue();
  });
});
