
import {Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, model, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import SelectData from '../../../shared/interfaces/SelectData.interface';

/*import { AddManagerDialogComponent } from '../../components/add-manager-dialog/add-manager-dialog.component';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import DataDialogAddManager from '../../interfaces/DataDialogAddManager.interface';*/

import Client from '../../../clients/interfaces/Client.interface';
import { ClientService } from '../../../clients/services/client-service/client.service';
import CustomSwal from '../../../shared/utils/CustomSwal';
import ClientUtils from '../../../clients/utils/ClientUtils';
import { AuthService } from '../../../auth/service/auth.service';
import { VacancyService } from '../../services/vacancy/vacancy.service';
import VacancyUtils from '../../utils/VacancyUtils';
import CreateVacancyForm from '../../interfaces/CreateVacancyForm.interface';
import UserRoleByClient from '../../../clients/interfaces/UserRoleByClient.interface';
import { SharedService } from '../../../shared/shared.service';
import { finalize, single } from 'rxjs';
import { PickerManagePeriodoComponent } from "../../../shared/components/picker-manage-periodo/picker-manage-periodo.component";
import CreateVacancy from '../../interfaces/CreateVacancy.interface';
import { Router } from '@angular/router';


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'shared-new-vacancy-v2',
  providers: [provideMomentDateAdapter(MY_FORMATS)],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    PickerManagePeriodoComponent
],
  schemas : [CUSTOM_ELEMENTS_SCHEMA] ,
  templateUrl: './new-vacancy-v2.component.html',
  styleUrl: './new-vacancy-v2.component.css'
})
export class NewVacancyV2Component implements OnInit {

  public selectedValue: string = '';
  public selectedCar: string = '';

  private clientService: ClientService = inject(ClientService);
  private vacancyService: VacancyService = inject(VacancyService);
  private authService: AuthService = inject(AuthService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private sharedService:SharedService = inject(SharedService);
  private router: Router = inject(Router);

  clients :WritableSignal<Client[] | null> = signal([]);
  user = computed(()=>this.authService.userValue);
  roleByClient: WritableSignal<UserRoleByClient| null> =  signal(null);
  
  selectClients : WritableSignal<SelectData[]> = signal([]);
  selectSector:WritableSignal<SelectData[]> = signal([]);
  selectLeaders:WritableSignal<SelectData[]> = signal([])
  selectStatus:WritableSignal<SelectData[]> = signal([]);

  selectVacancyType:WritableSignal<SelectData[]> = signal([]);

  newVacancyForm: FormGroup<CreateVacancyForm> = this.formBuilder.group({
    name:                   ['', [Validators.required]],
    number_openings:        [1,[Validators.required, Validators.min(1)]],
    assignment_date:        [moment(), [Validators.required]],
    management_periodo:     ['', [Validators.required]],
    sector_id:              [null as number|null, [Validators.required]],
    responsible:            [this.user()?.id as number|null, [Validators.required]],
    role_responsible:       [null as number|null, [Validators.required]],
    client:                 [null as number|null, [Validators.required]],
    leader:                 [null as number|null, [Validators.required]],
    vacancy_type:           [null as number|null, [Validators.required]],
    status:                 [null as number|null,[Validators.required]]
  });

  ngOnInit(): void {

    if(this.clientService.clientsValue){
      this.clients.set(this.clientService.clientsValue);
    }else{
      this.sharedService.isLoading.set(true);
      this.clientService.getAll()
      .pipe(finalize(()=> {this.sharedService.isLoading.set(false)}))
      .subscribe({
        next: data => {
          this.clients.set(data);
          this.selectClients.set(ClientUtils.selectClients(data));
        },
        error: err => {
          CustomSwal.modalError("Algo ha salido mal", "No ha sido posible obtener los clientes");
        }
      });
    }

    this.clientService.getAllLeaders().subscribe({
      next : leaders => {
        this.selectLeaders.set(ClientUtils.selectLeaders(leaders));
      },
      error: err => {
        CustomSwal.modalError("Algo ha salido mal", "No ha sido posible obtener los lideres");
      }
    })

    this.vacancyService.getAllSectors().subscribe({
      next: sectors => {
        this.selectSector.set(VacancyUtils.selectSector(sectors));
      },
      error: err=> {
        CustomSwal.modalError("Algo ha salido mal", "No ha sido posible obtener los sectores");
      }
    });

    this.vacancyService.getAllVacancyTypes().subscribe({
      next : data => {
        this.selectVacancyType.set(VacancyUtils.selectVacancyType(data));
      },
      error : err => {
        CustomSwal.modalError("Algo ha salido mal", "No ha sido posible obtener los tipos de vacante");
      }
    })

    this.vacancyService.getAllVacancyStatus().subscribe({
      next : data => {
        this.selectStatus.set(VacancyUtils.selectVacancyStatus(data));
      },
      error: err => {
        CustomSwal.modalError("Algo ha salido mal", "No ha sido posible obtener los posibles estados de las vacantes");
      }
    })


  }

  

  /*readonly dialog = inject(MatDialog);

  openDialog(): void {
    
    const dialogData : DataDialogAddManager = {
      title : 'Añadir encargados',
      selectEmpleadoData : this.empleados,
      selectCargoData: this.cargos
    }

    const dialogRef = this.dialog.open(AddManagerDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
      }
    });
  }*/


  selectClient() {
    let clientId = this.newVacancyForm.get('client')?.value
    let userId = this.authService.userValue?.id
    if(clientId && userId) {

      this.sharedService.isLoading.set(true);

      this.clientService.userRoleByClient(clientId,userId)
      .pipe(finalize(()=>this.sharedService.isLoading.set(false)))
      .subscribe({
        next: data => {
          this.roleByClient.set(data);
          this.newVacancyForm.get('role_responsible')?.setValue(data.role);
        },
        error: err => {
          this.roleByClient.set(null);
          this.newVacancyForm.get('role_responsible')?.setValue(null);
          CustomSwal.modalError("Lo sentimos", "El usuario no tiene un role con el cliente");
        }
      })
    }
  }

  selectedPeriodoDate(date:string|undefined) {
    this.newVacancyForm.get('management_periodo')?.setValue(date!);
  }

  addVacancy() {
   if(this.newVacancyForm.valid){

    let newVacancy:CreateVacancy = {
      name: this.newVacancyForm.get('name')!.value!,
      number_openings: this.newVacancyForm.get('number_openings')!.value!,
      assignment_date: this.newVacancyForm.get('assignment_date')!.value!.format('YYYY-MM-DD'),
      management_periodo: this.newVacancyForm.get('management_periodo')!.value!,
      sector_id: this.newVacancyForm.get('sector_id')!.value!,
      responsible: this.newVacancyForm.get('responsible')!.value!,
      role_responsible: this.newVacancyForm.get('role_responsible')!.value!,
      client: this.newVacancyForm.get('client')!.value!,
      leader: this.newVacancyForm.get('leader')!.value!,
      vacancy_type: this.newVacancyForm.get('vacancy_type')!.value!,
      status: this.newVacancyForm.get('status')!.value!
    }

    this.vacancyService.create(newVacancy).subscribe({
      next: data=> {
        this.clearForm();
        CustomSwal.toast({title:"La vacante se ha creado de forma exitosa"});
      },
      error: err => {
        CustomSwal.modalError("No hemos podido registrar la vacante", "Pongase en contacto con un administrador");
      }
    })

   }else{
    CustomSwal.modalError("Formulario invalido", "Rellene los campos correctamente");
   }
  }

  cancel(): void {
    this.router.navigate(["/vacancy/vacancies"]);
  }

  

  clearForm() {  
    this.newVacancyForm.get('name')?.setValue('');
    this.newVacancyForm.get('number_opening')?.reset();
    this.newVacancyForm.get('assignment_date')?.reset();
    this.newVacancyForm.get('management_periodo')?.setValue('');
    this.newVacancyForm.get('sector_id')?.reset();
    this.newVacancyForm.get('client')?.reset();
    this.newVacancyForm.get('leader')?.reset();
    this.newVacancyForm.get('vacancy_type')?.reset();
    this.newVacancyForm.get('status')?.reset();
  }

}