import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManagerDialogComponent } from './add-manager-dialog.component';

describe('AddManagerDialogComponent', () => {
  let component: AddManagerDialogComponent;
  let fixture: ComponentFixture<AddManagerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddManagerDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddManagerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
