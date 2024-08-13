import { Component, computed, inject } from '@angular/core';
import { DropDownUserMneuComponent } from '../drop-down-user-mneu/drop-down-user-mneu.component';
import { AuthService } from '../../../auth/service/auth.service';
import DropDownMenuItem from '../../interfaces/DropDownMenuItem.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-header',
  standalone: true,
  imports: [DropDownUserMneuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  authService = inject(AuthService);
  isAuth = computed(()=> this.authService.userValue() );
  router: Router = inject(Router);

  menuItems: DropDownMenuItem[] = [
    {
      id: 1,
      description: "Logout",
      handler : () => {
        this.authService.logOut();
        this.router.navigate(['/login']);
        
      }
    }
  ]; 

}
