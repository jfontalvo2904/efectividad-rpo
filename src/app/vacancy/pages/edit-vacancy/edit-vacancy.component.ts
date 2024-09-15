import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoadingModalComponent } from '../../../shared/components/loading-modal/loading-modal.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
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
import { finalize, single } from 'rxjs';
import { ClientService } from '../../../clients/services/client-service/client.service';
import ClientUtils from '../../../clients/utils/ClientUtils';
import { MatDialog } from '@angular/material/dialog';
import DataDialogAddSupportStaff from '../../interfaces/DataDialogAddSupportStaff.interface';
import SupportStaffByClientResponse from '../../interfaces/SupportStaffByClientResponse';
import { AddSupportStaffDialogComponent } from '../../components/add-support-staff-dialog/add-support-staff-dialog.component';
import SupportStaffByVacancyResponse from '../../interfaces/SupportStaffByVacancyResponse.interface';
import SourceTableFormat from '../../interfaces/SourceTableFormat.interface';
import VacancyUtils from '../../utils/VacancyUtils';
import Source from '../../interfaces/Source.interface';
import DataDialogAddSource from '../../interfaces/DataDialogAddSource.interface';
import { AddSourceDialogComponent } from '../../components/add-source-dialog/add-source-dialog.component';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import UpdateVacancyRequest from '../../interfaces/UpdateVacancyRequest.interface';
import Role from '../../../auth/interfaces/Role.interface';
import UserRoleByClient from '../../../clients/interfaces/UserRoleByClient.interface';

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
  userRole:WritableSignal<UserRoleByClient|null> = signal(null)

  selectLeaders:WritableSignal<SelectData[]> = signal([])
  supportsByVacancy: WritableSignal<SupportStaffByVacancyResponse[]> = signal([]);
  selectedSource:string = '';
  vacancyId:number|null = null;
  vacancy?:Vacancy;
  selectSource: WritableSignal<SelectData[]> = signal([]);

  source: WritableSignal<Source| null> = signal(null);

  superRoles = signal(['Consultor front', 'Consultor', 'Asistente 360']);
  powerRoles = signal(['Consultor de apoyo']);
  basicRoles = signal(['Asistente', 'Asistente de apoyo'])
  
  sources =computed(()=> {
    if(this.source()) {
      return VacancyUtils.sourceToSourceTableFormatList(this.source()!)
    }else{
      return []
    }
  });

  
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
    this.user = this.authService.userValue;

    this.myForm = this.formBulder.group({
      client: [{value:'',disabled:true},[Validators.required]],
      responsible_name: [{value:'',disabled:true},[Validators.required]],
      role_responsible_name: [{value:'',disabled:true},[Validators.required]],
      name: [{value:'',disabled:true},[Validators.required]],
      leader: [{value:'',disabled:true},[Validators.required]],
      assignment_date:[{value:'',disabled:true},[Validators.required]],
      deadline:[{value:'',disabled:true},[Validators.required]],
      number_openings:[{value:null,disabled:true},[Validators.required]],
      preselection: [null,Validators.required],
      successful_screening: [null,Validators.required],
      interviewed_consultant:[null,Validators.required],
      sent_to_the_client:[null,Validators.required],
      approved_by_client:[null,Validators.required],
      approval_target:[null],
      observations:[null],
    }, {validators: this.filledValidate})
  
    this.activedRoute.paramMap.subscribe( paramMap  => {
      if(paramMap.get('id')) {
        this.vacancyId = Number(paramMap.get('id'));

        if(!this.vacancyId) {
          this.router.navigate(['/vacancies'])
        }
      }
    });

  }
  ngOnInit(): void {

    this.sharedService.isLoading.set(true);

    this.vacancyService.getVacanyById(this.vacancyId!)
    .pipe(finalize(()=>this.sharedService.isLoading.set(false)))
    .subscribe({
      next: vacancy => {
        this.vacancy = vacancy;
        this.setUserRole(this.user!.id, this.vacancy.client)
      },
      error: err => {
        CustomSwal.modalError("Algo salió mal", `No hemos podido obtener la vacante con id ${this.vacancyId}`);
      }
    }); 

    this.clientService.getAllLeaders().subscribe({
      next : leaders => {
        this.selectLeaders.set(ClientUtils.selectLeaders(leaders));
      },
      error: err => {
        CustomSwal.modalError("Algo ha salido mal", "No ha sido posible obtener los lideres");
      }
    });

  }

  formValueChange(controlName: string, value:any) {
   
    if(controlName === 'cancelled' || controlName === 'suspended') {
      this.validateOpening(controlName);
    }
  }


  validateOpening(controlName:string) {

    if(controlName === 'cancelled' || controlName === 'suspended') {
      let sum = Number(this.myForm.get('cancelled')!.value) + Number(this.myForm.get('suspended')!.value);

      if(sum > this.myForm.get('number_openings')!.value ) {
        this.setForm(controlName,0);
        CustomSwal.modalError("Error", "La suma de posiciones canceladas + suspendidas no puede ser mayor al Número de posicones totales");
      }

    }
  }

  filledValidate:ValidatorFn = (abstractControl : AbstractControl) =>  {
    const formGroup = abstractControl as FormGroup

    if(formGroup) {
      const filled = formGroup.get('filled');
      const filled_on_time = formGroup.get('filled_on_time')
      const filled_late = formGroup.get('filled_late')

      let sum = Number(filled_late?.value) + Number(filled_on_time?.value);

      if (Number(filled?.value) !== sum) {
        filled?.setErrors({ sumMismatch: true });
      } else {
        // Si no hay error, asegúrate de limpiar el error anterior
        if (filled?.hasError('sumMismatch')) {
          filled.setErrors(null); // Limpia el error si ya no existe
        }
      }
    }

    return null;

  }

  getSources(vacancyId:number): void {
    this.vacancyService.getSourceByVacancy(vacancyId).subscribe({
      next: data => {
        this.source.set(data); // la instancia real de los datos que llegaron
        this.selectSource.set(VacancyUtils.selectSources(data)); // datos modificados para el select
      },
      error: ()=> {
        CustomSwal.modalError("Algo salió mal", "No pudimos obtener las fuentes de la vacante");
      }
    })
  }

  initForm() {
    if(!this.vacancy) {
      CustomSwal.modalError("NO se ha podido iniciar el formulario", "Contacta con un administrador");
    }else {

      if(this.superRoles().includes(this.userRole()!.role_name) || this.powerRoles().includes(this.userRole()!.role_name)) {
      
        this.myForm.addControl('cancelled', new FormControl(null, Validators.required));
        this.myForm.addControl('suspended', new FormControl(null, Validators.required));
        this.myForm.addControl('filled', new FormControl(null, Validators.required));
        this.myForm.addControl('filled_on_time', new FormControl(null, Validators.required));
        this.myForm.addControl('filled_late', new FormControl(null, Validators.required));
        this.myForm.addControl('open', new FormControl({value: null, disabled: true}, Validators.required));
        this.myForm.addControl('lost', new FormControl({value: null, disabled: true}, Validators.required));
        this.myForm.addControl('overcoverage', new FormControl({value: null, disabled: true}, Validators.required));
        this.myForm.addControl('closing_date', new FormControl(null));

        this.myForm.get('cancelled')?.valueChanges.subscribe((newValue) => {
          this.formValueChange('cancelled',newValue)
        });
    
        this.myForm.get('suspended')?.valueChanges.subscribe((newValue) => {
          this.formValueChange('suspended',newValue)
        });

      }

      if( this.superRoles().includes(this.userRole()!.role_name)) {

        this.vacancyService.allSupportStaffByVacancy(this.vacancy.idunique_vacancy).subscribe({
          next: data =>{
            this.supportsByVacancy.set(data);
          },
          error: err => {
            console.log("No fue posible obtener los encargados de la vacante","Por favor notifique el error a un administrador");
          }
        });

      }

      

      this.vacancyService.getDeadLineByVacancy(this.vacancy.client,this.vacancy.assignment_date).subscribe({
        next: data => {
          this.setForm('deadline',data.deadline)
        },
        error: err => {
          CustomSwal.modalError("No pudimos obtener la fecha de cierre","Por favor contacta al administrador");
        }
      })

      this.setForm('client',this.vacancy.client);
      this.setForm('responsible_name',this.vacancy.responsible_name);
      this.setForm('role_responsible_name',this.vacancy.role_responsible_name);
      this.setForm('name',this.vacancy.name);
      this.setForm('leader',this.vacancy.leader_name)
      this.setForm('assignment_date',this.vacancy.assignment_date);
      this.setForm('number_openings',this.vacancy.number_openings);
      this.setForm('cancelled',this.vacancy.cancelled);
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
      this.setForm('open',this.vacancy.open);
      this.setForm('lost',this.vacancy.lost);
      this.setForm('overcoverage',this.vacancy.overcoverage);
      this.setForm('closing_date',this.vacancy.closing_date);

    }
  }

  setForm(property:string, value: any): void {
    this.myForm.get(property)?.setValue(value);
  }

  


  setUserRole(userId:number, clientId:number) {
    this.clientService.userRoleByClient(clientId,userId).subscribe({
      next: roleByClient => {
        this.userRole.set(roleByClient);
        this.initForm();
        this.getSources(this.vacancy!.id)
      },
      error: () => {
        CustomSwal.modalError("No tienes un rol asignado con el cliente", "Serás redirigido en 3 segundos");
        
        setTimeout(()=>{this.router.navigate(["/vacancy/vacancies"]);},3000)
        
      }
    })
  }



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


  columsSources = [
    'busqueda_avature',
    'computrabajo',
    'convocatoria',
    'correo',
    'el_empleo',
    'facebook',
    'instagram',
    'landing_page',
    'linkedIn',
    'otros',
    'pandape',
    'referido',
  ]

  mapColumSources = {
    'busqueda_avature' : 'Busqueda avature',
    'computrabajo' : 'Computrabajo',
    'convocatoria' : 'Convocatoria',
    'correo' : 'Correo',
    'el_empleo' : 'El empleo',
    'facebook' : 'Facebook',
    'instagram' : 'Instagram',
    'landing_page': 'Landing page',
    'linkedIn' : 'Linkedin',
    'otros' : 'Otros',
    'pandape': 'Pandape',
    'referido' : 'Referido',
  }

  addButtonOptionsSources:CustomTableAddButtonOptions = {
    description: "Añadir fuente",
    fontIcon:"add",
    handleFunction: ()=> { 
      this.openDialogAddSource()
     }
  }

  openDialogAddSource() {
    const dialogData : DataDialogAddSource = {
      title : 'Añadir Fuente',
      sources: this.selectSource(),
      source: this.source()!
    }

    const dialogRef = this.dialog.open(AddSourceDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.vacancyService.updateSourceByVacancy(result).subscribe({
          next: data => {
            CustomSwal.toast({title: "Las fuentes se han actualizado correctamente"});
            this.source.set(data);
          },
          error: ()=> {
            CustomSwal.modalError("No pudimos actualizar las fuentes", "Intenta de nuevo en otro momento")
          }
        })
      }
    });

  }

  openConfirmationDialogUpdateVacancy(): void {
    
    const dialogData : {title:string, description:string} = {
      title : `Actualizar vacante ${this.vacancy?.id}`,
      description : "¿Realmente desea guardar los cambios?"
    }

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe( (response:boolean | undefined) => {
     
      if(response) {
        this.updateVacancy();
      }
    });
  }

  updateVacancy() {
    if(this.myForm.valid) {

      const formClosingDate = this.myForm.get('closing_date')?.value;

      const closing_date:string | null = formClosingDate ? formClosingDate.format('YYYY-MM-DD') : null

      let updateVacancyReques = {
        ...this.vacancy,
        client : this.myForm.get('client')?.value,
        name : this.myForm.get('name')?.value,
        assignment_date : this.myForm.get('assignment_date')?.value,
        deadline : this.myForm.get('deadline')?.value,
        number_openings : this.myForm.get('number_openings')?.value,
        ...this.myForm.value,
        closing_date

      }

      delete updateVacancyReques.open
      delete updateVacancyReques.lost
      delete updateVacancyReques.overcoverage
      delete updateVacancyReques.vacancy_type_name
      delete updateVacancyReques.client_name
      delete updateVacancyReques.responsible_name
      delete updateVacancyReques.role_responsible_name
      delete updateVacancyReques.id
      delete updateVacancyReques.leader_name
      delete updateVacancyReques.responsible_name
      delete updateVacancyReques.role_responsible_name
      delete updateVacancyReques.sector_name
      delete updateVacancyReques.vacancy_type_name


      this.sharedService.isLoading.set(true);

      this.vacancyService.updateVacancy(this.vacancy!.id,updateVacancyReques)
      .pipe(finalize(()=>{this.sharedService.isLoading.set(false)}))
      .subscribe({
        next: data => {
          CustomSwal.toast({title:"Se han guardado los datos correctametne", timer:3000})
          this.vacancy = data;
          this.initForm();
        },
        error: ()=> {
          CustomSwal.modalError("Algo ha salido mal y no pudimos actualizar la vacante", "ponte en contacto con un administrador");
        }
      })


    }else{
      CustomSwal.modalError("Verifica tu formulario", "Los campos marcados con * son obligatorios");
    }
  }

  cancel() {
    this.router.navigate(["/vacancy/vacancies"])
  }

  
}
