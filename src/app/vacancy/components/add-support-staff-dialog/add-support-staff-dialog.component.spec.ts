import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupportStaffDialogComponent } from './add-support-staff-dialog.component';

describe('AddSupportStaffDialogComponent', () => {
  let component: AddSupportStaffDialogComponent;
  let fixture: ComponentFixture<AddSupportStaffDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSupportStaffDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSupportStaffDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
