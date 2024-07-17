import { Component, input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

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
    MatIconModule, ],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css'
})
export class CustomTableComponent implements OnInit, AfterViewInit {

  data = input.required<any[]>({alias : 'dataSource'});
  colums = input.required<string[]>();
  withPaginator = input<boolean>(false);
  withSort = input<boolean>(false);
  pageSizeOptions = input<number[]>([5,10,20]);
  withFilter = input<boolean>(false);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  dataSource?: MatTableDataSource<any>;

  ngOnInit(): void {
    this.dataSource  = new MatTableDataSource<any>(this.data());
  }

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();
  }



}
