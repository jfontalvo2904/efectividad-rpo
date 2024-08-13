import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService : AuthService = inject(AuthService);
  const router : Router = inject( Router);

  if(authService.userValue()) {
    return true;
  }else {
    router.navigate(['/login']);
    return false;
  }

};
