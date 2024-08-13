import { Component, input } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'shared-loading-modal',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading-modal.component.html',
  styleUrl: './loading-modal.component.css'
})
export class LoadingModalComponent {

  diameter = input<number>(150);

}
