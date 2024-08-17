import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'shared-confirmation-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {

  readonly dialogRef = inject(MatDialogRef<ConfirmationModalComponent>);
  readonly data = inject<{title: string, description:string}>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
  aceptar(): boolean {  
    return true; 
  }

}
