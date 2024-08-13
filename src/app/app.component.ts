import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { HeaderComponent } from './shared/components/header/header.component';
import SideNavItem from './shared/interfaces/SideNavItem.interface';
import { AuthService } from './auth/service/auth.service';
import { LoadingModalComponent } from './shared/components/loading-modal/loading-modal.component';
import User from './auth/interfaces/User.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    SideNavComponent, 
    HeaderComponent, 
    LoadingModalComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'efectividad-rpo';

  authService: AuthService = inject(AuthService);
  router : Router = inject(Router);

  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.authService.refreshUser().subscribe({
      next: (data : User | null)=> {
        this.isLoading.set(false);
        if(data){
          this.router.navigate(['/clients'])
        }
      },
      error : (err) => {
        this.isLoading.set(false);
        console.log('La sesión ha expirado', err);
      }
    })

  }


  sideNavItems:SideNavItem[] = [
    {
      description : 'Agregar vacante',
      icon : 'assignment',
      route : '/vacancy/new-vacancy'
    },
    {
      description:'Clientes',
      icon : 'account_box',
      route: '/clients'
    }
  ]
}
