import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { HeaderComponent } from './shared/components/header/header.component';
import SideNavItem from './shared/interfaces/SideNavItem.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SideNavComponent, HeaderComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'efectividad-rpo';

  sideNavItems:SideNavItem[] = [
    {
      description : 'Agregar vacante 1',
      icon : 'assignment',
      route : '/nueva-vacante'
    },
    {
      description : 'Agregar vacante 2',
      icon : 'assignment',
      route : '/nueva-vacante-v2'
    },
    {
      description:'Clientes',
      icon : 'account_box',
      route: '/clientes'
    }
  ]
}
