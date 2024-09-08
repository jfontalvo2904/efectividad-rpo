import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerManagePeriodoComponent } from './picker-manage-periodo.component';

describe('PickerManagePeriodoComponent', () => {
  let component: PickerManagePeriodoComponent;
  let fixture: ComponentFixture<PickerManagePeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickerManagePeriodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickerManagePeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
