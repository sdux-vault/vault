import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { VaultMergeFluentApiCommonComponent } from './merge-flient-api.component';

describe('Component: VaultMergeFluentApiCommon', () => {
  let fixture: ComponentFixture<VaultMergeFluentApiCommonComponent>;

  const getText = () => fixture.nativeElement.textContent as string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultMergeFluentApiCommonComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultMergeFluentApiCommonComponent);
  });

  it('renders MergeConfig by default', () => {
    fixture.detectChanges();

    expect(getText()).toContain('options?: MergeConfig');
    expect(getText()).not.toContain('options?: ArrayByIdMergeConfig');
  });

  it('renders ArrayByIdMergeConfig when type is arrayById', () => {
    fixture.componentRef.setInput('type', 'arrayById');
    fixture.detectChanges();

    expect(getText()).toContain('options?: ArrayByIdMergeConfig');
    expect(getText()).not.toContain('options?: MergeConfig');
  });

  it('describes isDelete when type is arrayById', () => {
    fixture.componentRef.setInput('type', 'arrayById');
    fixture.detectChanges();

    expect(getText()).toContain('set isDelete to remove incoming entities');
  });
});
