import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { CustomTableComponent } from '../../../shared/components/custom-table/custom-table.component';
import ActionItem from '../../../shared/interfaces/ActionItem.interface';
import { Router } from '@angular/router';



export interface Cliente {
  id: number,
  nit: number;
  name: string;
}

const ELEMENT_DATA: Cliente[] = [
  {id: 1, nit: 12312312, name : 'Ecopetrol'},
  {id: 2, nit: 11312312, name : 'Bavaria'},
];

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
export class AllClientsComponent implements AfterViewInit  {

  private router : Router = inject(Router);

  displayedColumns: string[] = ['id', 'nit', 'name', 'actions'];
  
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
    }
  ]

  data  = ELEMENT_DATA;

  dataSource = new MatTableDataSource<Cliente>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAction(event : {actionReference: string, element: Cliente}) {
    switch( event.actionReference) {
      case 'Detalles' : 
      this.goToClientDetails(event.element);
      break;
    }
  }

  goToClientDetails(cliente: Cliente) {
    this.router.navigate( [`/clientes/detail/${cliente.id}`]);
  }
}
