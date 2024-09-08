import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { HeaderComponent } from './shared/components/header/header.component';
import SideNavItem from './shared/interfaces/SideNavItem.interface';
import { AuthService } from './auth/service/auth.service';
import { LoadingModalComponent } from './shared/components/loading-modal/loading-modal.component';
import User from './auth/interfaces/User.interface';
import CustomSwal from './shared/utils/CustomSwal';
import { SharedService } from './shared/shared.service';
import { finalize } from 'rxjs';

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
  sharedService:SharedService = inject(SharedService);
  router : Router = inject(Router);
  activatedRoute = inject(ActivatedRoute);


  isLoading = computed( ()=> this.sharedService.isLoading() )

  ngOnInit(): void {
    this.sharedService.isLoading.set(true);

    this.authService.refreshUser()
    .pipe(finalize(()=>{this.sharedService.isLoading.set(false)})).subscribe({
      next: (data : User | null)=> {
        if(data){
          this.router.navigate(['/vacancy/vacancies'])
        }
      },
      error : (err) => {
        CustomSwal.toast({title:"La sesión ha expirado", icon:"error"})
        console.log('La sesión ha expirado', err);
      }
    })

  }


  sideNavItems:SideNavItem[] = [
    {
      description: 'Vacantes',
      icon: 'assignment',
      route:'/vacancy/vacancies'
    },
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
