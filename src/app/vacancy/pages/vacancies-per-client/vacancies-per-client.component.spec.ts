import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacanciesPerClientComponent } from './vacancies-per-client.component';

describe('VacanciesPerClientComponent', () => {
  let component: VacanciesPerClientComponent;
  let fixture: ComponentFixture<VacanciesPerClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacanciesPerClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VacanciesPerClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
