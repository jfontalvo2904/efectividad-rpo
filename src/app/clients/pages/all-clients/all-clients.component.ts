import {AfterViewInit, Component, computed, inject, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { CustomTableComponent } from '../../../shared/components/custom-table/custom-table.component';
import ActionItem from '../../../shared/interfaces/ActionItem.interface';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client-service/client.service';
import Client from '../../interfaces/Client.interface';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthService } from '../../../auth/service/auth.service';
import { EditClientDialogComponent } from '../../components/edit-client-dialog/edit-client-dialog.component';
import DataDialogEditClient from '../../interfaces/DataDialogEditClient.interface';
import CustomSwal from '../../../shared/utils/CustomSwal';

import { 
  MatDialog,
} from '@angular/material/dialog';
import { LoadingModalComponent } from '../../../shared/components/loading-modal/loading-modal.component';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { finalize } from 'rxjs';
import CustomTableAddButtonOptions from '../../../shared/interfaces/CustomTableAddButtonOptions.interface';
import CreateClientData from '../../interfaces/CreateClientData.interface';


@Component({
  selector: 'clients-all',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CustomTableComponent,
    MatProgressSpinnerModule,
    EditClientDialogComponent,
    LoadingModalComponent,
    ConfirmationModalComponent
  ],
  templateUrl: './all-clients.component.html',
  styleUrl: './all-clients.component.css'
})
export class AllClientsComponent implements AfterViewInit, OnInit  {
  
  private router : Router = inject(Router);
  private clientService: ClientService = inject(ClientService);
  public clients = computed(()=>this.clientService.clientsValue);
  private authService : AuthService = inject(AuthService);
  public isSuperUser = this.authService.userValue?.is_superuser;

  readonly dialog = inject(MatDialog);

  public isLoading = signal<boolean>(false);

  actionsItems : WritableSignal<ActionItem[]> = signal([
    {
      actionDescription: 'Vacantes',
      icon: 'people_outline'
    }
  ])

  addButtonOptions:CustomTableAddButtonOptions = {
    tooltipDescription: "Añadir",
    tooltipPosition : "above",
    fontIcon:"add",
    handleFunction: ()=> { this.openDialogCreateClient() }
  }

  ngOnInit(): void {
    this.clientService.getAll().subscribe({
      error : (err) => {
        console.log('error al obtener los clientes')
      }
    })
   
    if(this.isSuperUser) {
      this.actionsItems.set(
        [
          ...this.actionsItems(), 
          { actionDescription : 'Editar', icon: 'edit'},
          { actionDescription : 'Eliminar', icon: 'delete'},

        ]
      );
    }
  }
  displayedColumns: string[] = ['id', 'nit', 'name', 'business_name', 'date_intro','ans_submission','ans_closing','is_active', 'actions'];
  
  mapColum = {
    'id' : 'ID',
    'nit': 'NIT',
    'name': 'Nombre',
    'business_name' : 'Razón social',
    'date_intro' : 'Fecha de ingreso',
    'is_active' : 'State',
    'ans_submission': 'Ans de entrega',
    'ans_closing' : 'Ans de cubrimiento',
    'actions': 'Actions'
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    
  }

  openDialogEditClient(client : Client): void {
    
    const dialogData : DataDialogEditClient = {
      title : `Editar cliente ${client.name}`,
      client : client
    }

    const dialogRef = this.dialog.open(EditClientDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe( (client: Client | null) => {
      if (client) {
        this.editClient(client);
      }
    });

  }

  openDialogCreateClient() {

    const dialogRef = this.dialog.open(EditClientDialogComponent, {
      data: {title:"Crear cliente"}
    });

    dialogRef.afterClosed().subscribe( (client: CreateClientData | null) => {
      if (client) {
        const cleanedClient = Object.fromEntries(Object.entries(client).filter(([key, value]) => value !== null && value !== undefined)) as CreateClientData;
        
        this.isLoading.set(true);
        this.clientService.createClient(cleanedClient)
        .pipe(finalize(()=>{this.isLoading.set(false)}))
        .subscribe({
          next : clientRes => {
            CustomSwal.toast({title:"El cliente se ha creado correctamente", timer:2000});
          },
          error: err => {
            CustomSwal.toast({title:"No hemos podido eliminar al cliente", icon:"error", timer:2000});
          } 
        })
      }
    });

  }

  
  openConfirmationDialog(client: Client): void {
    
    const dialogData : {title:string, description:string} = {
      title : `Eliminar cliente ${client.name}`,
      description : "¿Realmente desea eliminar al cliente?"
    }

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe( (response:boolean | undefined) => {
     
      if(response) {
        this.deleteClient(client.id!);
      }
    });
  }

  deleteClient(clientId:number) {

    this.isLoading.set(true);

    this.clientService
    .deleteClient(clientId)
    .pipe(finalize(()=>{this.isLoading.set(false)}))
    .subscribe({
      next : response => {
        CustomSwal.toast({title: "El cliente se ha eliminado correctamente",timer:2000})
      },
      error: err => {
        CustomSwal.toast({title:"No se ha podido eliminar el cliente", icon:"error", timer:2000});
      }
    })

  }

  editClient(client : Client) {
    this.isLoading.set(true);
    
    this.clientService.editClient(client).subscribe({

      next : ()=> {
        this.isLoading.set(false);
        CustomSwal.toast({title: "El cliente se ha editado correctamente",timer:2000})
      },
      error : (err) => {
        this.isLoading.set(false);
        console.log('Error al editar usuario')
      }
    });
  }


  handleAction(event : {actionReference: string, element: Client}) {
    const client: Client = event.element;
    
    switch( event.actionReference) {
      case 'Detalles' : 
        this.goToClientDetails(client);
        break;

      case 'Vacantes':
        this.goToVacanciesPerClient(client);
        break;
      
      case 'Editar':
        this.openDialogEditClient(client)
        break;
      case 'Eliminar':
        this.openConfirmationDialog(client);
        break;
    }
  }

  goToClientDetails(client: Client) {
    this.router.navigate( [`/clients/detail/${client.id}`]);
  }

  goToVacanciesPerClient(client: Client) {
    this.router.navigateByUrl('/vacancy/vacancies', { 
      state: { clientId: client.id } 
    });
  }
}