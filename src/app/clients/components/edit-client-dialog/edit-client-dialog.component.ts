import {Component, inject, Input, model, OnInit} from '@angular/core';
import {FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDateFormats} from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import Client from '../../interfaces/Client.interface';
import DataDialogEditOrCreateClient from '../../interfaces/DataDialogEditClient.interface';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import moment from 'moment';
import {MatSlideToggleModule,} from '@angular/material/slide-toggle';
import CreateClientData from '../../interfaces/CreateClientData.interface';

const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'YYYY/MM',
    dateA11yLabel: 'YYYY/MM/DD',
    monthYearA11yLabel: 'YYYY/MM',
  },
};


@Component({
  selector: 'app-edit-client-dialog',
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
    MatDatepickerModule,
    MatSlideToggleModule
  ],
  templateUrl: './edit-client-dialog.component.html',
  styleUrl: './edit-client-dialog.component.css'
})
export class EditClientDialogComponent{
 

  readonly dialogRef = inject(MatDialogRef<EditClientDialogComponent>);
  readonly data = inject<DataDialogEditOrCreateClient>(MAT_DIALOG_DATA);

  private formBuilder: FormBuilder = inject(FormBuilder);

  public clientForm: FormGroup;

  constructor() {

    if(this.data.client) {
      this.clientForm = this.formBuilder.group( {
        nit : [this.data.client.nit, [Validators.required]],
        name : [this.data.client.name, [Validators.required]],
        businessName : [this.data.client.business_name],
        dateIntro : [this.data.client.date_intro],
        ansSubmission : [this.data.client.ans_submission, [Validators.required,Validators.pattern('^[0-9]+$')]],
        ansClosing : [this.data.client.ans_closing, [Validators.required,Validators.pattern('^[0-9]+$')]],
        isActivate: [this.data.client.is_active, [Validators.required]]
  
      })
    }else{

      this.clientForm = this.formBuilder.group( {
        nit : ["" , [Validators.required]],
        name : ["", [Validators.required]],
        businessName : [null],
        dateIntro : [null],
        ansSubmission : [null, [Validators.pattern('^[0-9]+$')]],
        ansClosing : [null,[Validators.pattern('^[0-9]+$')]],
        isActivate: [false]
  
      })
    }
  
    if(this.data.client?.date_intro) {
      this.clientForm.get('dateIntro')!.setValue(moment(this.data.client.date_intro));
    }
    
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

  aceptar(): Client| CreateClientData | null {
    
    if(this.clientForm.valid) {
      
      let dateIntro : string | null = null;

      if(this.clientForm.get('dateIntro')?.value) {
        dateIntro = this.clientForm.get('dateIntro')!.value.format('YYYY-MM-DD');
      }

      return {
        id: this.data.client?.id,
        nit : this.clientForm.get('nit')!.value,
        name: this.clientForm.get('name')!.value,
        business_name: this.clientForm.get('businessName')!.value,
        date_intro: dateIntro,
        ans_submission: this.clientForm.get('ansSubmission')!.value,
        ans_closing: this.clientForm.get('ansClosing')!.value,
        is_active: this.clientForm.get('isActivate')!.value
      }
    }
    return null;
    
  }

}
