import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path : '',
        pathMatch : 'full',  
        redirectTo : '/login'
    },
    {
        path : 'login',
        component: LoginComponent
    },
    {
        path : '**',
        component: NotFoundComponent
    }
];
