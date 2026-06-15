import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SnapshotDiffService } from '../../../services/snapshot-diff.service';
import { StateTableViewComponent } from './state-table-view.component';

describe('StateTableViewComponent', () => {
  let component: StateTableViewComponent;
  let fixture: ComponentFixture<StateTableViewComponent>;

  /**
   * Creates a minimal table input for testing.
   */
  function createSnapshot(
    value: unknown,
    label = 'resolve'
  ): { label: string; value: unknown } {
    return { label, value };
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateTableViewComponent, MatTooltipModule],
      providers: [provideZonelessChangeDetection(), SnapshotDiffService]
    }).compileComponents();
  });

  function createComponent(
    before: { label: string; value: unknown },
    after: { label: string; value: unknown }
  ): void {
    fixture = TestBed.createComponent(StateTableViewComponent);
    fixture.componentRef.setInput('beforeLabel', before.label);
    fixture.componentRef.setInput('beforeValue', before.value);
    fixture.componentRef.setInput('afterLabel', after.label);
    fixture.componentRef.setInput('afterValue', after.value);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent(createSnapshot(undefined), createSnapshot([{ id: 1 }]));
    expect(component).toBeTruthy();
  });

  it('should show empty message when both snapshots have no data', () => {
    createComponent(createSnapshot(null), createSnapshot(null));
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.empty-table')).toBeTruthy();
  });

  it('should render two tables when data is present', () => {
    const before = createSnapshot([{ id: 1, name: 'Luke' }], 'filter');
    const after = createSnapshot(
      [
        { id: 1, name: 'Luke' },
        { id: 2, name: 'Leia' }
      ],
      'reducer'
    );
    createComponent(before, after);

    const tables = fixture.nativeElement.querySelectorAll('.state-table');
    expect(tables.length).toBe(2);
  });

  it('should show table headings with stage names', () => {
    const before = createSnapshot([{ id: 1 }], 'filter');
    const after = createSnapshot([{ id: 1 }], 'reducer');
    createComponent(before, after);

    const headings = fixture.nativeElement.querySelectorAll('.table-heading');
    expect(headings[0].textContent).toContain('BEFORE: filter');
    expect(headings[1].textContent).toContain('AFTER: reducer');
  });

  it('should show + indicator for added rows in after table', () => {
    const before = createSnapshot([{ id: 1, name: 'Luke' }]);
    const after = createSnapshot([
      { id: 1, name: 'Luke' },
      { id: 2, name: 'Han' }
    ]);
    createComponent(before, after);

    const afterTable = fixture.nativeElement.querySelectorAll(
      '.state-table-container'
    )[1];
    const indicators = afterTable.querySelectorAll('.status-indicator.added');
    expect(indicators.length).toBe(1);
    expect(indicators[0].textContent.trim()).toBe('+');
  });

  it('should show - indicator for removed rows in before table', () => {
    const before = createSnapshot([
      { id: 1, name: 'Luke' },
      { id: 2, name: 'Han' }
    ]);
    const after = createSnapshot([{ id: 1, name: 'Luke' }]);
    createComponent(before, after);

    const beforeTable = fixture.nativeElement.querySelectorAll(
      '.state-table-container'
    )[0];
    const indicators = beforeTable.querySelectorAll(
      '.status-indicator.removed'
    );
    expect(indicators.length).toBe(1);
    expect(indicators[0].textContent.trim()).toBe('-');
  });

  it('should show ~ indicator for modified rows', () => {
    const before = createSnapshot([
      { id: 1, name: 'Luke', lastName: 'Skywalker' }
    ]);
    const after = createSnapshot([
      { id: 1, name: 'Luke', lastName: 'Skywalker', jedi: true }
    ]);
    createComponent(before, after);

    const afterTable = fixture.nativeElement.querySelectorAll(
      '.state-table-container'
    )[1];
    const modifiedIndicators = afterTable.querySelectorAll(
      '.status-indicator.modified'
    );
    expect(modifiedIndicators.length).toBe(1);
    expect(modifiedIndicators[0].textContent.trim()).toBe('~');
  });

  it('should apply cell-added class to added cells', () => {
    const before = createSnapshot([{ id: 1, name: 'Luke' }]);
    const after = createSnapshot([{ id: 1, name: 'Luke', jedi: true }]);
    createComponent(before, after);

    const afterTable = fixture.nativeElement.querySelectorAll(
      '.state-table-container'
    )[1];
    const addedCells = afterTable.querySelectorAll('td.cell-added');
    expect(addedCells.length).toBe(1);
    expect(addedCells[0].textContent.trim()).toBe('true');
  });

  it('should apply cell-removed class to removed cells in before table', () => {
    const before = createSnapshot([{ id: 1, name: 'Luke', jedi: true }]);
    const after = createSnapshot([{ id: 1, name: 'Luke' }]);
    createComponent(before, after);

    const beforeTable = fixture.nativeElement.querySelectorAll(
      '.state-table-container'
    )[0];
    const removedCells = beforeTable.querySelectorAll('td.cell-removed');
    expect(removedCells.length).toBe(1);
    expect(removedCells[0].textContent.trim()).toBe('true');
  });

  it('should not highlight any cells when snapshots are identical', () => {
    const val = [{ id: 1, name: 'Luke', lastName: 'Skywalker' }];
    createComponent(createSnapshot(val), createSnapshot(val));

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.cell-added').length).toBe(0);
    expect(el.querySelectorAll('.cell-removed').length).toBe(0);
    expect(el.querySelectorAll('.cell-modified').length).toBe(0);
    expect(el.querySelectorAll('.status-indicator').length).toBe(0);
  });

  it('should render correct columns per table when column sets differ', () => {
    const before = createSnapshot([{ id: 1, name: 'Luke' }]);
    const after = createSnapshot([{ id: 1, name: 'Luke', jedi: true }]);
    createComponent(before, after);

    const tables = fixture.nativeElement.querySelectorAll('.state-table');
    const beforeHeaders = tables[0].querySelectorAll('th');
    const afterHeaders = tables[1].querySelectorAll('th');

    // +1 for col-status header
    expect(beforeHeaders.length).toBe(3); // status + id + name
    expect(afterHeaders.length).toBe(4); // status + id + name + jedi
  });

  it('should format cell values correctly', () => {
    expect(component.formatCell(null)).toBe('null');
    expect(component.formatCell(undefined)).toBe('');
    expect(component.formatCell(42)).toBe('42');
    expect(component.formatCell(true)).toBe('true');
    expect(component.formatCell({ a: 1 })).toBe('{"a":1}');
  });

  it('should filter unchanged rows when showChangedOnly is true', () => {
    const before = createSnapshot([
      { id: 1, name: 'Luke' },
      { id: 2, name: 'Leia' }
    ]);
    const after = createSnapshot([
      { id: 1, name: 'Luke' },
      { id: 2, name: 'Leia Organa' }
    ]);
    fixture = TestBed.createComponent(StateTableViewComponent);
    fixture.componentRef.setInput('beforeLabel', before.label);
    fixture.componentRef.setInput('beforeValue', before.value);
    fixture.componentRef.setInput('afterLabel', after.label);
    fixture.componentRef.setInput('afterValue', after.value);
    fixture.componentRef.setInput('showChangedOnly', true);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const diff = component.tableDiff();
    const unchangedBefore = diff.beforeRows.filter(
      (r) => r.status === 'unchanged'
    );
    const unchangedAfter = diff.afterRows.filter(
      (r) => r.status === 'unchanged'
    );
    expect(unchangedBefore.length).toBe(0);
    expect(unchangedAfter.length).toBe(0);
  });

  describe('singleTable mode', () => {
    it('should render only the before table when singleTable is true', () => {
      const before = createSnapshot([{ id: 1, name: 'Luke' }], 'filter');
      const after = createSnapshot([{ id: 1, name: 'Han' }], 'reducer');
      fixture = TestBed.createComponent(StateTableViewComponent);
      fixture.componentRef.setInput('beforeLabel', before.label);
      fixture.componentRef.setInput('beforeValue', before.value);
      fixture.componentRef.setInput('afterLabel', after.label);
      fixture.componentRef.setInput('afterValue', after.value);
      fixture.componentRef.setInput('singleTable', true);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const containers = fixture.nativeElement.querySelectorAll(
        '.state-table-container'
      );
      expect(containers.length).toBe(1);

      const heading = containers[0].querySelector('.table-heading');
      expect(heading.textContent.trim()).toBe('filter');
    });
  });

  describe('afterOnly mode', () => {
    it('should render only the after table when afterOnly is true', () => {
      const before = createSnapshot([{ id: 1, name: 'Luke' }], 'filter');
      const after = createSnapshot([{ id: 1, name: 'Han' }], 'reducer');
      fixture = TestBed.createComponent(StateTableViewComponent);
      fixture.componentRef.setInput('beforeLabel', before.label);
      fixture.componentRef.setInput('beforeValue', before.value);
      fixture.componentRef.setInput('afterLabel', after.label);
      fixture.componentRef.setInput('afterValue', after.value);
      fixture.componentRef.setInput('afterOnly', true);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const containers = fixture.nativeElement.querySelectorAll(
        '.state-table-container'
      );
      expect(containers.length).toBe(1);

      const heading = containers[0].querySelector('.table-heading');
      expect(heading.textContent.trim()).toBe('reducer');
    });

    it('should merge removed rows into the after table', () => {
      const before = createSnapshot(
        [
          { id: 1, name: 'Luke' },
          { id: 2, name: 'Han' }
        ],
        'filter'
      );
      const after = createSnapshot([{ id: 1, name: 'Luke' }], 'reducer');
      fixture = TestBed.createComponent(StateTableViewComponent);
      fixture.componentRef.setInput('beforeLabel', before.label);
      fixture.componentRef.setInput('beforeValue', before.value);
      fixture.componentRef.setInput('afterLabel', after.label);
      fixture.componentRef.setInput('afterValue', after.value);
      fixture.componentRef.setInput('afterOnly', true);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const diff = component.afterOnlyDiff();
      expect(diff.afterRows.length).toBe(2);
      const removedRows = diff.afterRows.filter((r) => r.status === 'removed');
      expect(removedRows.length).toBe(1);

      const indicators = fixture.nativeElement.querySelectorAll(
        '.status-indicator.removed'
      );
      expect(indicators.length).toBe(1);
    });
  });

  describe('collapsed toggle', () => {
    it('should hide table body when collapsed', () => {
      const before = createSnapshot([{ id: 1, name: 'Luke' }], 'filter');
      const after = createSnapshot([{ id: 1, name: 'Han' }], 'reducer');
      createComponent(before, after);

      expect(
        fixture.nativeElement.querySelectorAll('.state-table').length
      ).toBe(2);

      component.collapsed.set(true);
      fixture.detectChanges();

      expect(
        fixture.nativeElement.querySelectorAll('.state-table').length
      ).toBe(0);
    });

    it('should toggle collapsed via the collapse button', () => {
      const before = createSnapshot([{ id: 1, name: 'Luke' }], 'filter');
      const after = createSnapshot([{ id: 1, name: 'Han' }], 'reducer');
      createComponent(before, after);

      const collapseBtn =
        fixture.nativeElement.querySelector('.collapse-toggle');
      collapseBtn.click();
      fixture.detectChanges();

      expect(component.collapsed()).toBe(true);
      expect(
        fixture.nativeElement.querySelectorAll('.state-table').length
      ).toBe(0);
    });
  });

  describe('empty state', () => {
    it('should hide the diff view hint when afterOnly is true', () => {
      fixture = TestBed.createComponent(StateTableViewComponent);
      fixture.componentRef.setInput('beforeLabel', 'filter');
      fixture.componentRef.setInput('beforeValue', null);
      fixture.componentRef.setInput('afterLabel', 'reducer');
      fixture.componentRef.setInput('afterValue', null);
      fixture.componentRef.setInput('afterOnly', true);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.empty-hint')).toBeNull();
    });

    it('should hide the diff view hint when singleTable is true', () => {
      fixture = TestBed.createComponent(StateTableViewComponent);
      fixture.componentRef.setInput('beforeLabel', 'filter');
      fixture.componentRef.setInput('beforeValue', null);
      fixture.componentRef.setInput('afterLabel', 'reducer');
      fixture.componentRef.setInput('afterValue', null);
      fixture.componentRef.setInput('singleTable', true);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.empty-hint')).toBeNull();
    });

    it('should show the diff view hint in default mode', () => {
      createComponent(createSnapshot(null), createSnapshot(null));

      expect(fixture.nativeElement.querySelector('.empty-hint')).toBeTruthy();
    });

    it('should show afterLabel in empty state when afterOnly is true', () => {
      fixture = TestBed.createComponent(StateTableViewComponent);
      fixture.componentRef.setInput('beforeLabel', 'filter');
      fixture.componentRef.setInput('beforeValue', null);
      fixture.componentRef.setInput('afterLabel', 'reducer');
      fixture.componentRef.setInput('afterValue', null);
      fixture.componentRef.setInput('afterOnly', true);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const heading = fixture.nativeElement.querySelector('.table-heading');
      expect(heading.textContent.trim()).toBe('reducer');
    });

    it('should show beforeLabel in empty state when singleTable is true', () => {
      fixture = TestBed.createComponent(StateTableViewComponent);
      fixture.componentRef.setInput('beforeLabel', 'filter');
      fixture.componentRef.setInput('beforeValue', null);
      fixture.componentRef.setInput('afterLabel', 'reducer');
      fixture.componentRef.setInput('afterValue', null);
      fixture.componentRef.setInput('singleTable', true);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const heading = fixture.nativeElement.querySelector('.table-heading');
      expect(heading.textContent.trim()).toBe('filter');
    });
  });
});
