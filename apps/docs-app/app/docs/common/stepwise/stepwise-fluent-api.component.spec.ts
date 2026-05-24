import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VaultStepwiseFluentApiCommonComponent } from './stepwise-fluent-api.component';

describe('Component: VaultStepwiseFluentApiCommon', () => {
  let fixture: ComponentFixture<VaultStepwiseFluentApiCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultStepwiseFluentApiCommonComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultStepwiseFluentApiCommonComponent);
  });

  /**
   * Helper to query rendered fluent API rows
   */
  function getRenderedFluentApis(): string[] {
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    return rows.map((row) => row.nativeElement.textContent.trim());
  }

  it('should render all stepwise APIs by default (type = all)', () => {
    // default input is 'all'
    const content = getRenderedFluentApis();

    expect(
      content.some((text) => text.includes('.withStepwiseFilter'))
    ).toBeTrue();
    expect(
      content.some((text) => text.includes('.withStepwiseReducer'))
    ).toBeTrue();
    expect(
      content.some((text) => text.includes('.withStepwiseResolve'))
    ).toBeTrue();
  });

  it('should render only the Filter stepwise API when type = filter', () => {
    fixture.componentRef.setInput('type', 'filter');

    const content = getRenderedFluentApis();

    expect(content.length).toBe(1);
    expect(content[0]).toContain('.withStepwiseFilter');
  });

  it('should render only the Reducer stepwise API when type = reducer', () => {
    fixture.componentRef.setInput('type', 'reducer');

    const content = getRenderedFluentApis();

    expect(content.length).toBe(1);
    expect(content[0]).toContain('.withStepwiseReducer');
  });

  it('should render only the Resolve stepwise API when type = resolve', () => {
    fixture.componentRef.setInput('type', 'resolve');

    const content = getRenderedFluentApis();

    expect(content.length).toBe(1);
    expect(content[0]).toContain('.withStepwiseResolve');
  });

  it('should render no rows when type is unsupported', () => {
    fixture.componentRef.setInput('type', 'unknown');

    const content = getRenderedFluentApis();

    expect(content.length).toBe(0);
  });
});
