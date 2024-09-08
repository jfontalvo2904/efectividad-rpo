import { Component, computed, inject, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../components/logo/logo.component';
import { HeaderComponent } from '../components/header/header.component';
import SideNavItem from '../interfaces/SideNavItem.interface';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/service/auth.service';

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

  private authService = inject(AuthService);

  public isAuth = computed( ()=> this.authService.userValue );

  @Input()
  items : SideNavItem[] = [];
  
}
