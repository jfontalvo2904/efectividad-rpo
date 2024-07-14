import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../components/logo/logo.component';
import { HeaderComponent } from '../components/header/header.component';
import SideNavItem from '../interfaces/SideNavItem.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    MatSidenavModule, 
    MatButtonModule, 
    RouterModule, 
    LogoComponent, 
    HeaderComponent,
    MatIconModule
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {

  @Input()
  items : SideNavItem[] = [];
  
}
