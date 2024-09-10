import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import SelectData from '../../../shared/interfaces/SelectData.interface';
import DataDialogAddSource from '../../interfaces/DataDialogAddSource.interface';
import Source from '../../interfaces/Source.interface';
import SourceKeysOriginal from '../../interfaces/SourceKeysOriginal.enum';

@Component({
  selector: 'app-add-source-dialog',
  standalone: true,
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
  ],
  templateUrl: './add-source-dialog.component.html',
  styleUrl: './add-source-dialog.component.css'
})
export class AddSourceDialogComponent {

  readonly dialogRef = inject(MatDialogRef<AddSourceDialogComponent>);
  readonly data = inject<DataDialogAddSource>(MAT_DIALOG_DATA);
  private formBuilder: FormBuilder = inject(FormBuilder);

  public selectSources: WritableSignal<SelectData[]> = signal([]);
  currentSource:Source;
  addSourceForm:FormGroup;

  constructor() {
    this.addSourceForm = this.formBuilder.group({
      source: [null, [Validators.required]],
      value: [null,[Validators.required]]

    });

    this.selectSources.set(this.data.sources);
    this.currentSource = this.data.source;
  }

  changeSelectSource(sourceName:string) {
    
   this.addSourceForm.get('source')?.setValue(sourceName);

   let sourceKey = this.verifySourceKey(sourceName);

   if(sourceKey) {
    this.addSourceForm.get('value')?.setValue(this.currentSource[sourceKey]);
   }

  }

  verifySourceKey(key:string):SourceKeysOriginal | null {
    switch(key) {
      case SourceKeysOriginal.busqueda_avature:
        return SourceKeysOriginal.busqueda_avature
  
      case SourceKeysOriginal.computrabajo:
        return SourceKeysOriginal.computrabajo
  
      case SourceKeysOriginal.convocatoria:
        return SourceKeysOriginal.convocatoria
      
      case SourceKeysOriginal.correo:
        return SourceKeysOriginal.correo
  
      case SourceKeysOriginal.el_empleo:
        return SourceKeysOriginal.el_empleo
  
      case SourceKeysOriginal.facebook:
        return SourceKeysOriginal.facebook
  
      case SourceKeysOriginal.instagram:
        return SourceKeysOriginal.instagram
  
      case SourceKeysOriginal.landing_page:
        return SourceKeysOriginal.landing_page
      
      case SourceKeysOriginal.linkedIn:
        return SourceKeysOriginal.linkedIn
  
      case SourceKeysOriginal.otros:
       return SourceKeysOriginal.otros
  
      case SourceKeysOriginal.pandape:
        return SourceKeysOriginal.pandape
  
      case SourceKeysOriginal.referido:
        return SourceKeysOriginal.referido
          
     }
     return null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  aceptar(): Source | void {

    const key = this.verifySourceKey(this.addSourceForm.get('source')?.value)

    if(this.addSourceForm.valid && key) {
     this.currentSource[key] = Number(this.addSourceForm.get('value')?.value);
      return this.currentSource;
    }
    
  }

}
