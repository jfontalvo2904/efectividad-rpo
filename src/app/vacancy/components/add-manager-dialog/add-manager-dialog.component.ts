import {Component, inject, Input, model, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MatDialogModule
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import DataDialogAddManager from '../../interfaces/DataDialogAddManager.interface';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'vacancy-add-manager-dialog',
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
    MatSelectModule
  ],
  templateUrl: './add-manager-dialog.component.html',
  styleUrl: './add-manager-dialog.component.css'
})
export class AddManagerDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddManagerDialogComponent>);
  readonly data = inject<DataDialogAddManager>(MAT_DIALOG_DATA);

  public selectedEmpleado?: string;
  public selectedCargo?: string;
 
  onNoClick(): void {
    this.dialogRef.close();
  }

  aceptar() {
    return {
      empleado : this.selectedEmpleado,
      cargo: this.selectedCargo
    }
  }
}
