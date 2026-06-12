import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailPaneComponent } from './detail-pane.component';

describe('Component: DetailPane', () => {
  let fixture: ComponentFixture<DetailPaneComponent>;
  let component: DetailPaneComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPaneComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPaneComponent);
    fixture.componentRef.setInput('title', 'Test Title');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the title', () => {
    const h3 = fixture.nativeElement.querySelector('h3');
    expect(h3.textContent.trim()).toBe('Test Title');
  });

  it('should have a close button with aria-label', () => {
    const btn = fixture.nativeElement.querySelector('.close-btn');
    expect(btn).toBeTruthy();
    expect(btn.getAttribute('aria-label')).toBe('Back to list');
    expect(btn.getAttribute('type')).toBe('button');
  });

  it('should emit closeDetail when close button is clicked', () => {
    spyOn(component.closeDetail, 'emit');
    const btn: HTMLButtonElement =
      fixture.nativeElement.querySelector('.close-btn');
    btn.click();
    expect(component.closeDetail.emit).toHaveBeenCalled();
  });

  it('should project content into the detail body', () => {
    const body = fixture.nativeElement.querySelector('.detail-body');
    expect(body).toBeTruthy();
  });
});
