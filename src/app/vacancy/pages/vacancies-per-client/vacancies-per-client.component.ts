import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VacancyService } from '../../services/vacancy/vacancy.service';
import Vacancy from '../../interfaces/Vacancy.interface';
import { CustomTableComponent } from '../../../shared/components/custom-table/custom-table.component';
import ActionItem from '../../../shared/interfaces/ActionItem.interface';

@Component({
  selector: 'app-vacancies-per-client',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './vacancies-per-client.component.html',
  styleUrl: './vacancies-per-client.component.css'
})
export class VacanciesPerClientComponent implements OnInit {

  private activedRoute : ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private vacancyService : VacancyService = inject(VacancyService);
  public vacancies = signal<Vacancy[]>([]);

  public clientId!: number;
  
  public displayedColums: string[] = [
    "id",
    "name",
    "number_openings",
    "assignment_date",
    "deadline",
    "management_periodo",
    "idunique_vacancy",
    "cancelled",
    "suspended",
    "filled",
    "filled_on_time",
    "filled_late",
    "open",
    "lost",
    "closing_date",
    "preselection",
    "successful_screening",
    "interviewed_consultant",
    "sent_to_the_client",
    "approved_by_client",
    "approval_target",
    "observations",
    "sector_id",
    "responsible",
    "role_responsible",
    "client",
    "leader",
    "vacancy_type",
    "status"
  ];

  public mapColum = {
    'id' : 'ID',
    'name': 'Nombre de la vacante',
    'availablePositions': '# Posiciones solicitadas',
    'dateAssignment': 'Fecha de asignación',
    'state': 'Estado',
    'observations' : 'Observaciones',
    'actions' : 'Acciones'
    
  }

  actionsItems : ActionItem[] = [
    {
      actionDescription: 'Editar',
    },
  ]


  constructor() {
    this.activedRoute.paramMap.subscribe( paramMap  => {
      if(paramMap.get('id')) {
        this.clientId = Number(paramMap.get('id'));

        if(!this.clientId) {
          this.router.navigate(['/clientes'])
        }
      }
    })
  };

  ngOnInit(): void {
    this.vacancyService.getVacanciesPerClient(this.clientId).subscribe({
      next : data => {
        this.vacancies.set(data);
        console.log(this.vacancies()[0])
      }
    })
  }

  handleActions( event : any) {
    console.log(event)
  }

}
