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

import { 
  MatDialog,
} from '@angular/material/dialog';
import { LoadingModalComponent } from '../../../shared/components/loading-modal/loading-modal.component';


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
    LoadingModalComponent
  ],
  templateUrl: './all-clients.component.html',
  styleUrl: './all-clients.component.css'
})
export class AllClientsComponent implements AfterViewInit, OnInit  {
  
  private router : Router = inject(Router);
  private clientService: ClientService = inject(ClientService);
  public clients = computed(()=>this.clientService.clientsValue());
  private authService : AuthService = inject(AuthService);

  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'nit', 'name', 'business_name', 'date_intro','ans_submission','ans_closing','is_active', 'actions'];

  public isLoading = signal<boolean>(false);

  actionsItems : WritableSignal<ActionItem[]> = signal([
    {
      actionDescription: 'Detalles',
      icon : 'search'
    },
    {
      actionDescription: 'Vacantes',
      icon: 'people_outline'
    }
  ])

  ngOnInit(): void {
    this.clientService.getAll().subscribe({
      error : (err) => {
        console.log('error al obtener los clientes')
      }
    })
   
    if(this.authService.userValue()?.is_superuser) {
      this.actionsItems.set([...this.actionsItems(), { actionDescription : 'Editar', icon: 'edit'}]);
    }
  }
  
  mapColum = {
    'id' : 'ID',
    'nit': 'NIT',
    'name': 'NAME',
    'business_name' : 'BUSINESS NAME',
    'date_intro' : 'DATE INTRO',
    'is_active' : 'STATE',
    'ans_submission': 'ANS SUBMISSION',
    'ans_closing' : 'ANS CLOSING',
    'actions': 'ACTIONS'
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    
  }

  openDialog(client : Client): void {
    
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

  editClient(client : Client) {
    this.isLoading.set(true);
    
    this.clientService.editClient(client).subscribe({

      next : ()=> {
        this.isLoading.set(false);
      },
      error : (err) => {
        this.isLoading.set(false);
        console.log('Error al editar usuario')
      }
    });
  }


  handleAction(event : {actionReference: string, element: Client}) {
    switch( event.actionReference) {
      case 'Detalles' : 
        this.goToClientDetails(event.element);
        break;

      case 'Vacantes':
        this.goToVacanciesPerClient(event.element);
        break;
      
      case 'Editar':
        this.openDialog(event.element)
        break;
    }
  }

  goToClientDetails(client: Client) {
    this.router.navigate( [`/clients/detail/${client.id}`]);
  }

  goToVacanciesPerClient(client: Client) {
    this.router.navigate( [`/vacancy/vacancies-per-client/${client.id}`]);
  }
}
