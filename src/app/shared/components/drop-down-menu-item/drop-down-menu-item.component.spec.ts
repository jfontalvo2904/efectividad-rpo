import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownMenuItemComponent } from './drop-down-menu-item.component';

describe('DropDownMenuItemComponent', () => {
  let component: DropDownMenuItemComponent;
  let fixture: ComponentFixture<DropDownMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropDownMenuItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropDownMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
