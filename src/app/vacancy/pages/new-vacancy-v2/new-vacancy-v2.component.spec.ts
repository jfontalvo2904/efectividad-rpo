import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVacancyV2Component } from './new-vacancy-v2.component';

describe('NewVacancyV2Component', () => {
  let component: NewVacancyV2Component;
  let fixture: ComponentFixture<NewVacancyV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewVacancyV2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewVacancyV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
