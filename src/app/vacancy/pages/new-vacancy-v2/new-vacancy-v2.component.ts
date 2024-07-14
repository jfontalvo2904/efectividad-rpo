
import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, model, signal} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { AddManagerDialogComponent } from '../../components/add-manager-dialog/add-manager-dialog.component';
import SelectData from '../../../shared/interfaces/SelectData.interface';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import DataDialogAddManager from '../../interfaces/DataDialogAddManager.interface';


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
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
    MatTooltipModule
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA] ,
  templateUrl: './new-vacancy-v2.component.html',
  styleUrl: './new-vacancy-v2.component.css'
})
export class NewVacancyV2Component {

  public selectedValue: string = '';
  public selectedCar: string = '';

  readonly dialog = inject(MatDialog);

 
  //datos de prueba para los select
  foods: SelectData[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  empleados: SelectData[] = [
    {value: 'emp-0', viewValue: 'Mariana'},
    {value: 'emp-1', viewValue: 'Stephany'},
    {value: 'emp-2', viewValue: 'Alejandra'},
  ]

  cargos: SelectData[] = [
    {value: 'cargo-0', viewValue: 'Student'},
    {value: 'cargo-1', viewValue: 'Data enginer'},
    {value: 'cargo-2', viewValue: 'University Student'},
  ]

  
  readonly date = new FormControl(moment());

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
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

}