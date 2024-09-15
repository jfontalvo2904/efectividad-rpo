import { Component, inject, signal, WritableSignal } from '@angular/core';
import SupportStaffByClientResponse from '../../interfaces/SupportStaffByClientResponse';
import DataDialogAddSupportStaff from '../../interfaces/DataDialogAddSupportStaff.interface';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import AddSupportStaffRequest from '../../interfaces/AddSupportStaffRequest.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import SelectData from '../../../shared/interfaces/SelectData.interface';
import VacancyUtils from '../../utils/VacancyUtils';
import { MatDateFormats } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import moment from 'moment';
import Role from '../../../auth/interfaces/Role.interface';
import UserUtils from '../../../auth/utils/UserUtils';

const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY-MM',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'YYYY-MM',
  },
};

@Component({
  selector: 'app-add-support-staff-dialog',
  standalone: true,
  providers: [provideMomentDateAdapter(MY_DATE_FORMATS)],
  imports: [ 
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,],
  templateUrl: './add-support-staff-dialog.component.html',
  styleUrl: './add-support-staff-dialog.component.css'
})
export class AddSupportStaffDialogComponent {

  readonly dialogRef = inject(MatDialogRef<AddSupportStaffDialogComponent>);
  readonly data = inject<DataDialogAddSupportStaff>(MAT_DIALOG_DATA);
  private formBuilder: FormBuilder = inject(FormBuilder);

  public selectSupports: WritableSignal<SelectData[]> = signal([]);
  public selectSupportRoles: WritableSignal<SelectData[]> = signal([]);
  currentRoleName = signal('');
  addSupportForm:FormGroup;

  constructor() {
    this.selectSupports
    .set(VacancyUtils.selectSupportStaffByClientResponse(this.data.supports));

    this.selectSupportRoles.set(UserUtils.selectRoles(this.data.supportRoles));

    this.addSupportForm = this.formBuilder.group({
      responsible: [null,[Validators.required]],
      role_responsible: [null,[Validators.required]],
      approval_target: [null,[Validators.required]],
      number_openings: [0,[Validators.required]],
      assignment_date: [this.data.vacancy.assignment_date,[Validators.required]]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  aceptar(): AddSupportStaffRequest | void {
    if(this.addSupportForm.valid) {
      return {
        idunique_vacancy: this.data.vacancy.idunique_vacancy,
        responsible: this.addSupportForm.get('responsible')?.value,
        role_responsible: this.addSupportForm.get('role_responsible')?.value,
        approval_target: Number(this.addSupportForm.get('approval_target')?.value),
        number_openings: Number(this.addSupportForm.get('number_openings')?.value),
        assignment_date: moment(this.addSupportForm.get('assignment_date')?.value).format('YYYY-MM-DD')
      }
    }
    
  }

}
