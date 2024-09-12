import { Component, inject, OnInit, signal } from '@angular/core';
import ActionItem from '../../../shared/interfaces/ActionItem.interface';
import { CustomTableComponent } from '../../../shared/components/custom-table/custom-table.component';
import { VacancyService } from '../../services/vacancy/vacancy.service';
import Vacancy from '../../interfaces/Vacancy.interface';
import { Router } from '@angular/router';
import CustomSwal from '../../../shared/utils/CustomSwal';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [CustomTableComponent,MatButtonModule, MatTooltipModule,MatIconModule],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.css'
})
export class VacanciesComponent implements OnInit {

  private vacancyService : VacancyService = inject(VacancyService);
  private router:Router = inject(Router);

  public vacancies = signal<Vacancy[]>([]);

  public byClientId:number|null = null;

  public displayedColums: string[] = [
    "id",
    "management_periodo",
    "client_name",
    "responsible_name",
    "name",
    "assignment_date",
    "number_openings",
    "status_name",
    'actions'
  ];

  public mapColum = {
    'id' : 'ID',
    'name': 'Nombre de la vacante',
    'availablePositions': '# Posiciones solicitadas',
    'client_name': "Cliente",
     "responsible_name": "Responsable",
    "management_periodo" : "Periodo de gestión",
    'dateAssignment': 'Fecha de asignación',
    'status_name': 'Estado',
    'observations' : 'Observaciones',
    'actions' : 'Acciones'
    
  }

  actionsItems : ActionItem[] = [
    {
      actionDescription: 'Detalles/Editar',
      icon:"edit"
    },
  ]

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.byClientId = navigation.extras.state['clientId']
    }
  }

  ngOnInit(): void {
    this.setData();  
  }

  setData() {
    if(this.byClientId) {
      this.vacancyService.getVacanciesPerClient(this.byClientId).subscribe({
        next: data => {
          this.setVacancyStatus(data);
        }
      });
    }else{
      this.vacancyService.getAll().subscribe({
        next : data => {
          this.setVacancyStatus(data);
        }
      })
    }
  }

  showAll() {
    this.byClientId = null;
    this.setData();
  }

  

  setVacancyStatus(vacancies: Vacancy[]) {
    this.vacancyService.getAllVacancyStatus().subscribe({
      next: data => {
        vacancies = vacancies.map(vacancy => {

          let findState = data.find( state => state.id ===  vacancy.status);

          if(findState) {
            return {
              ...vacancy,
              status_name: findState.name
            }
          }
          return vacancy
        
        });

        this.vacancies.set(vacancies);
      },
      error: ()=> {
        CustomSwal.modalError("No se pudieron obtener las vacantes","Por favor contacta a un administrador");
      }
    })
  }

  handleActions( event :  {actionReference: string, element: Vacancy}) {
    switch(event.actionReference) {
      case "Detalles/Editar":
        this.goToEditVacancy(event.element.id);
        break
    }
  }

  goToEditVacancy(vacancyId:number) {
    this.router.navigate( [`/vacancy/edit-vacancy/${vacancyId}`]);
  }

}
