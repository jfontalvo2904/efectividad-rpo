import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { authGuard } from './auth/guards/auth/auth.guard';

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
        path: 'vacancy',
        loadChildren : ()=> import('./vacancy/vacancy.routes').then( r => r.routes),
        canActivate: [authGuard]

    },
    {
        path: 'clients',
        loadChildren : ()=> import('./clients/clients.routes').then( r => r.routes),
        canActivate: [authGuard]
    },
    {
        path : '**',
        component: NotFoundComponent
    }
];
