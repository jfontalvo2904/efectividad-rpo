import { Component, EventEmitter, OnInit, Output, output, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';

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

@Component({
  selector: 'picker-manage-periodo',
  standalone: true,
  providers: [provideMomentDateAdapter(MY_FORMATS)],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './picker-manage-periodo.component.html',
  styleUrl: './picker-manage-periodo.component.css'
})
export class PickerManagePeriodoComponent implements OnInit {
 
  date = new FormControl(moment(),[Validators.required]);

  @Output() dataValue = new EventEmitter<string|undefined>


  ngOnInit(): void {
    this.dataValue.emit(this.date.value?.format('YYYYMM'));
  }



  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    this.dataValue.emit(this.date.value?.format('YYYYMM'))
    datepicker.close();
   
  }

}
