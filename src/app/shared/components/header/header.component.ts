import { Component } from '@angular/core';
import { DropDownUserMneuComponent } from '../drop-down-user-mneu/drop-down-user-mneu.component';

@Component({
  selector: 'shared-header',
  standalone: true,
  imports: [DropDownUserMneuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
