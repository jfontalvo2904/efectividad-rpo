import { Component, Input, input } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'shared-drop-down-menu-item',
  standalone: true,
  imports: [MatMenuModule],
  templateUrl: './drop-down-menu-item.component.html',
  styleUrl: './drop-down-menu-item.component.css'
})
export class DropDownMenuItemComponent {

  description = input.required<string>();
  
  @Input()
  handler?: ()=> void
  
}
