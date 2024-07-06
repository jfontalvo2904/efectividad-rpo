import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownUserMneuComponent } from './drop-down-user-mneu.component';

describe('DropDownUserMneuComponent', () => {
  let component: DropDownUserMneuComponent;
  let fixture: ComponentFixture<DropDownUserMneuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropDownUserMneuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropDownUserMneuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
