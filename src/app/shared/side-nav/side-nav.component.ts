import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../components/logo/logo.component';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, RouterModule, LogoComponent, HeaderComponent],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  
}
