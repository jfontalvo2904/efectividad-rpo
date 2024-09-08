import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoadingModalComponent } from '../../../shared/components/loading-modal/loading-modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDateFormats } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import CustomTableAddButtonOptions from '../../../shared/interfaces/CustomTableAddButtonOptions.interface';
import { CustomTableComponent } from '../../../shared/components/custom-table/custom-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import SelectData from '../../../shared/interfaces/SelectData.interface';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import Vacancy from '../../interfaces/Vacancy.interface';
import { VacancyService } from '../../services/vacancy/vacancy.service';
import CustomSwal from '../../../shared/utils/CustomSwal';
import { AuthService } from '../../../auth/service/auth.service';
import User from '../../../auth/interfaces/User.interface';
import { SharedService } from '../../../shared/shared.service';
import { finalize } from 'rxjs';
import { ClientService } from '../../../clients/services/client-service/client.service';
import ClientUtils from '../../../clients/utils/ClientUtils';
import { MatDialog } from '@angular/material/dialog';
import DataDialogAddSupportStaff from '../../interfaces/DataDialogAddSupportStaff.interface';
import SupportStaffByClientResponse from '../../interfaces/SupportStaffByClientResponse';
import { AddSupportStaffDialogComponent } from '../../components/add-support-staff-dialog/add-support-staff-dialog.component';
import SupportStaffByVacancyResponse from '../../interfaces/SupportStaffByVacancyResponse.interface';

const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'YYYY/MM',
    dateA11yLabel: 'YYYY/MM/DD',
    monthYearA11yLabel: 'YYYY/MM',
  },
};

interface VacancyManager {
  name: string,
  position: string
}


@Component({
  selector: 'edit-vacancy',
  standalone: true,
  providers: [provideMomentDateAdapter(MY_DATE_FORMATS)],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    LoadingModalComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
    CustomTableComponent,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './edit-vacancy.component.html',
  styleUrl: './edit-vacancy.component.css'
})
export class EditVacancyComponent implements OnInit {

  myForm : FormGroup;
  formBulder = inject(FormBuilder);
  private activedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private vacancyService:VacancyService = inject(VacancyService);
  private authService:AuthService = inject(AuthService);
  private sharedService:SharedService = inject(SharedService);
  private clientService: ClientService = inject(ClientService);

  user: User | null;

  selectLeaders:WritableSignal<SelectData[]> = signal([])
  supportsByVacancy: WritableSignal<SupportStaffByVacancyResponse[]> = signal([]);
  selectedSource:string = '';
  vacancyId:number|null = null;
  vacancy?:Vacancy;

  readonly dialog = inject(MatDialog);

  openDialogAddSupportStaff(supports: SupportStaffByClientResponse[]): void {
    
    const dialogData : DataDialogAddSupportStaff = {
      title : 'Añadir encargados',
      supports,
      vacancy: this.vacancy!,
    }

    const dialogRef = this.dialog.open(AddSupportStaffDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.sharedService.isLoading.set(true);

        this.vacancyService.addSupportStaff(result)
        .pipe(finalize(()=>{this.sharedService.isLoading.set(false)}))
        .subscribe({
          next: response => {
            console.log(response)
            this.supportsByVacancy.update( value => [...value,response]);
            CustomSwal.toast({title:"Se ha agregado al encargado correctamente"})
          },
          error: err => {
            CustomSwal.modalError("Algo ha salido mal", "No hemos podido agregar al encargado");
          }
        });
      }
    });

  }

  constructor() {
    this.myForm = this.formBulder.group({
      client: [{value:'',disabled:true},[Validators.required]],
      name: [{value:'',disabled:true},[Validators.required]],
      leader: [{value:'',disabled:true},[Validators.required]],
      assignment_date:[{value:'',disabled:true},[Validators.required]],
      deadline:[{value:'',disabled:true},[Validators.required]],
      number_openings:[{value:null,disabled:true},[Validators.required]],
      cancelledPositions: [],
      suspended:[],
      filled:[],
      filled_on_time:[],
      filled_late:[null],
      closing_date:[],
      preselection: [],
      successful_screening: [],
      interviewed_consultant:[],
      sent_to_the_client:[],
      approved_by_client:[],
      approval_target:[],
      source:[],
      observations:[],
      probabilityOfClousure:[],
      costByVacancy:[]

    })

    this.activedRoute.paramMap.subscribe( paramMap  => {
      if(paramMap.get('id')) {
        this.vacancyId = Number(paramMap.get('id'));

        if(!this.vacancyId) {
          this.router.navigate(['/vacancies'])
        }
      }
    });

    this.user = this.authService.userValue;

  }
  ngOnInit(): void {
    this.sharedService.isLoading.set(true);

    this.vacancyService.getVacanyById(this.vacancyId!)
    .pipe(finalize(()=>this.sharedService.isLoading.set(false)))
    .subscribe({
      next: vacancy => {
        this.vacancy = vacancy;
        console.log(this.vacancy)
        this.initForm();
      },
      error: err => {
        CustomSwal.modalError("Algo salió mal", `No hemos podido obtener la vacante con id ${this.vacancyId}`);
      }
    }) 

    this.clientService.getAllLeaders().subscribe({
      next : leaders => {
        this.selectLeaders.set(ClientUtils.selectLeaders(leaders));
      },
      error: err => {
        CustomSwal.modalError("Algo ha salido mal", "No ha sido posible obtener los lideres");
      }
    })

  }

  initForm() {
    if(!this.vacancy) {
      CustomSwal.modalError("NO se ha podido iniciar el formulario", "Contacta con un administrador");
    }else {

      this.vacancyService.allSupportStaffByVacancy(this.vacancy.idunique_vacancy).subscribe({
        next: data =>{
          this.supportsByVacancy.set(data);
        },
        error: err => {
          console.log("No fue posible obtener los encargados de la vacante","Por favor notifique el error a un administrador");
        }
      });

      this.vacancyService.getDeadLineByVacancy(this.vacancy.client,this.vacancy.assignment_date).subscribe({
        next: data => {
          this.setForm('deadline',data.deadline)
        },
        error: err => {
          CustomSwal.modalError("No pudimos obtener la fecha de cierre","Por favor contacta al administrador");
        }
      })

      this.setForm('client',this.vacancy.client);
      this.setForm('name',this.vacancy.name);
      this.setForm('leader',this.vacancy.leader_name)
      this.setForm('assignment_date',this.vacancy.assignment_date);
      this.setForm('number_openings',this.vacancy.number_openings);
      this.setForm('preselection',this.vacancy.preselection);
      this.setForm('successful_screening',this.vacancy.successful_screening);
      this.setForm('sent_to_the_client',this.vacancy.sent_to_the_client);
      this.setForm('approved_by_client',this.vacancy.approved_by_client);
      this.setForm('interviewed_consultant',this.vacancy.interviewed_consultant);
      this.setForm('suspended',this.vacancy.suspended);
      this.setForm('observations',this.vacancy.observations);
      this.setForm('filled',this.vacancy.filled);
      this.setForm('filled_late',this.vacancy.filled_late);
      this.setForm('filled_on_time',this.vacancy.filled_on_time)
      this.setForm('approval_target',this.vacancy.approval_target);
      this.setForm('closing_date',this.vacancy.closing_date);

    }
  }

  setForm(property:string, value: any): void {
    this.myForm.get(property)?.setValue(value);
  }

  vacaniesManagers: VacancyManager[] = [
    {
      name : "stephany",
      position : "Ing de Sistemas"
    },
    {
      name: "Mariana",
      position: "Ing de sistemas"
    }
  ] 

  columsManagers = [
    'responsible_name',
    'role_responsible_name',
    'assignment_date',
    'number_openings',
    'approval_target'
  ]

  mapColum = {
    'responsible_name': 'Nombre encargado',
    'role_responsible_name': 'Cargo',
    'assignment_date': 'Fecha de asignación',
    'number_openings': 'Número de vacantes',
    'approval_target': 'Meta de aprobación'
  }

  addButtonOptions:CustomTableAddButtonOptions = {
    tooltipDescription: "Añadir Encargado",
    tooltipPosition : "above",
    fontIcon:"add",
    handleFunction: ()=> { 
      if(this.vacancy) {
        this.clientService.getAllSupportStaffByClient(this.vacancy.client).subscribe({
          next: supports => {
            this.openDialogAddSupportStaff(supports);
          },
          error: () => {
            CustomSwal.modalError("No es posible obtener los support staff para el cliente","Contacta con un administrador");
          }
        })
      }
      
     }
  }

  


}
