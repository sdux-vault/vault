import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleViewerTableComponent } from './example-viewer-table.component';

describe('ExampleViewerTableComponent', () => {
  let fixture: ComponentFixture<ExampleViewerTableComponent<any>>;
  let component: ExampleViewerTableComponent<any>;
  let row: any;

  beforeEach(async () => {
    row = Object({ id: 1 });
    await TestBed.configureTestingModule({
      imports: [ExampleViewerTableComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleViewerTableComponent);
    component = fixture.componentInstance;
  });

  // ---------------------------------------------------------------------------
  // Columns config
  // ---------------------------------------------------------------------------
  it('should expose correct default columnsToDisplay', () => {
    expect(component.columnsToDisplay).toEqual([
      'id',
      'fullName',
      'firstName',
      'lastName',
      'role',
      'status'
    ]);
  });

  it('should expose correct columnsToDisplayWithExpand', () => {
    expect(component.columnsToDisplayWithExpand).toEqual([
      'expand',
      'id',
      'fullName',
      'firstName',
      'lastName',
      'role',
      'status'
    ]);
  });

  // ---------------------------------------------------------------------------
  // Expansion logic
  // ---------------------------------------------------------------------------
  it('should return false for isExpanded when no row is expanded', () => {
    expect(component.isExpanded(row)).toBeFalse();
  });

  it('should expand a row when toggle is called', () => {
    const result = component.toggle(row);
    expect(result).toBeTrue();
    expect(component.isExpanded(row)).toBeTrue();
  });

  it('should collapse the row when toggling the same row again', () => {
    component.toggle(row);
    expect(component.isExpanded(row)).toBeTrue();

    const result = component.toggle(row);
    expect(result).toBeFalse();
    expect(component.isExpanded(row)).toBeFalse();
  });

  it('should switch expansion when toggling a different row', () => {
    component.toggle(row);
    expect(component.isExpanded(row)).toBeTrue();

    const row2 = Object({ id: 2 });

    component.toggle(row2);
    expect(component.isExpanded(row)).toBeFalse();
    expect(component.isExpanded(row2)).toBeTrue();
  });

  // ---------------------------------------------------------------------------
  // Column title mapping
  // ---------------------------------------------------------------------------
  it('should map known columns to proper titles', () => {
    expect(component.getColumnTitle('id')).toBe('Id');
    expect(component.getColumnTitle('fullName')).toBe('Name');
    expect(component.getColumnTitle('firstName')).toBe('First');
    expect(component.getColumnTitle('lastName')).toBe('Last');
    expect(component.getColumnTitle('role')).toBe('Role');
    expect(component.getColumnTitle('status')).toBe('Status');
  });

  it('should return empty string for unknown columns', () => {
    expect(component.getColumnTitle('unknown-column')).toBe('');
  });
});
