import { Component, input, OnInit, AfterViewInit, ViewChild, Signal, signal, output, effect } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import ActionItem from '../../interfaces/ActionItem.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import CustomTableAddButtonOptions from '../../interfaces/CustomTableAddButtonOptions.interface';


@Component({
  selector: 'shared-custom-table',
  standalone: true,
  imports: [
    JsonPipe,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule, 
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css'
})
export class CustomTableComponent implements AfterViewInit {

  data = input.required<any[]>({alias : 'dataSource'});
  colums = input.required<string[]>();
  tableTopClasses = input<string[]>([]);
  paginatorClasses = input<string[]>([])
  withPaginator = input<boolean>(false);
  withSort = input<boolean>(false);
  mapColum = input<any | null>(null);
  withActions = input<boolean>(false);
  actionsItems = input<ActionItem[]>([])
  pageSizeOptions = input<number[]>([5,10,20]);
  withFilter = input<boolean>(false);
  withAddButton = input<boolean>(false);
  addButtonOptons = input<CustomTableAddButtonOptions>({
    tooltipDescription: "Añadir",
    tooltipPosition : "above",
    fontIcon:"add",
    handleFunction: ()=>{}
  })

  actionEvent = output<any>();

  propertyNames = signal<string[]>([]);

  constructor() {
    this.dataSource  = new MatTableDataSource<any>([]);
    effect(()=> {
      this.dataSource!.data = this.data()
    })
  }


  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  dataSource?: MatTableDataSource<any>;




  ngAfterViewInit(): void {

    if(this.dataSource) {

      if(this.withPaginator()) {
        this.dataSource!.paginator = this.paginator;
      }

      if(this.withSort()) {
        this.dataSource.sort = this.sort;
      }
      
      
    }
    
  }

  getMapColum( colum : string ): string {
    if(this.mapColum()) {
      if(colum in this.mapColum()!) {
        return this.mapColum()[colum];
      }
    }
    return colum;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();
  }

  handleAction( action: string,element : any) {
    this.actionEvent.emit( {
      actionReference : action,
      element
    } );
  }



}
