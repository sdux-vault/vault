import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { VaultArrayMergeComparisonCommonComponent } from './array-merge-comparison.component';

describe('Component: VaultArrayMergeComparisonCommon', () => {
  let fixture: ComponentFixture<VaultArrayMergeComparisonCommonComponent>;
  let component: VaultArrayMergeComparisonCommonComponent;

  const normalizeText = (value: string): string =>
    value.replace(/\s+/g, ' ').trim();

  const getFirstTableHeaders = (): string[] =>
    fixture.debugElement
      .queryAll(
        By.css('table[aria-label="Input and Result Examples"] thead th')
      )
      .map(({ nativeElement }) => normalizeText(nativeElement.textContent));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultArrayMergeComparisonCommonComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultArrayMergeComparisonCommonComponent);
    component = fixture.componentInstance;
  });

  it('renders all comparison tables', () => {
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(2);
  });

  it('orders the default comparison first by default', () => {
    fixture.detectChanges();

    expect(component['order']()).toEqual(['Default', 'Append', 'Push']);
    expect(getFirstTableHeaders()).toEqual([
      'Inputs',
      'Default Result',
      'Append Result',
      'Push Result'
    ]);
  });

  it('orders the append comparison first for type append', () => {
    fixture.componentRef.setInput('type', 'append');
    fixture.detectChanges();

    expect(component['order']()).toEqual(['Append', 'Push', 'Default']);
    expect(getFirstTableHeaders()).toEqual([
      'Inputs',
      'Append Result',
      'Push Result',
      'Default Result'
    ]);
  });

  it('orders the push comparison first for type push', () => {
    fixture.componentRef.setInput('type', 'push');
    fixture.detectChanges();

    expect(component['order']()).toEqual(['Push', 'Append', 'Default']);
    expect(getFirstTableHeaders()).toEqual([
      'Inputs',
      'Push Result',
      'Append Result',
      'Default Result'
    ]);
  });

  it('renders the headers and body for one representative table', () => {
    fixture.detectChanges();

    const table = fixture.debugElement.query(
      By.css('table[aria-label="Input and Result Examples"]')
    );
    const headers = table
      .queryAll(By.css('thead th'))
      .map(({ nativeElement }) => normalizeText(nativeElement.textContent));
    const cells = table
      .queryAll(By.css('tbody td'))
      .map(({ nativeElement }) => normalizeText(nativeElement.textContent));

    expect(headers).toEqual([
      'Inputs',
      'Default Result',
      'Append Result',
      'Push Result'
    ]);
    expect(cells.slice(0, 4)).toEqual([
      'current: [1, 2, 3] next: [4, 5]',
      '[4, 5]',
      '[1, 2, 3, 4, 5]',
      '[1, 2, 3, [4, 5]]'
    ]);
  });
});
