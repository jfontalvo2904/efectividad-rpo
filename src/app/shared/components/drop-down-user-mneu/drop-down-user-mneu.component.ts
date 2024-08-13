import { Component, input } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import DropDownMenuItem from '../../interfaces/DropDownMenuItem.interface';
import { DropDownMenuItemComponent } from '../drop-down-menu-item/drop-down-menu-item.component';

@Component({
  selector: 'drop-down-user-mneu',
  standalone: true,
  imports: [MatMenuModule, DropDownMenuItemComponent],
  templateUrl: './drop-down-user-mneu.component.html',
  styleUrl: './drop-down-user-mneu.component.css'
})
export class DropDownUserMneuComponent {

  items = input.required<DropDownMenuItem[]>()

}
