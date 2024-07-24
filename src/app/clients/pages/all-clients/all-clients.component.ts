import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
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
    CustomTableComponent
  ],
  templateUrl: './all-clients.component.html',
  styleUrl: './all-clients.component.css'
})
export class AllClientsComponent implements AfterViewInit, OnInit  {
  
  private router : Router = inject(Router);
  private clientService: ClientService = inject(ClientService);
  public clients?: Client[];

  displayedColumns: string[] = ['id', 'nit', 'name', 'actions'];

  ngOnInit(): void {
    this.clientService.getAll().subscribe({
      next : (clients:Client[]) => {
        this.clients = clients;
      }
    })
  }
  
  mapColum = {
    'id' : 'ID',
    'nit': 'NIT',
    'name': 'NAME',
    'actions': 'ACTIONS'
  }

  actionsItems : ActionItem[] = [
    {
      actionDescription: 'Detalles',
      icon : 'search'
    },
    {
      actionDescription: 'Vacantes',
      icon: 'people_outline'
    }
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    
  }


  handleAction(event : {actionReference: string, element: Client}) {
    switch( event.actionReference) {
      case 'Detalles' : 
        this.goToClientDetails(event.element);
        break;

      case 'Vacantes':
        this.goToVacanciesPerClient(event.element);
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
