import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { NewVacancyComponent } from './vacancy/pages/new-vacancy/new-vacancy.component';
import { NewVacancyV2Component } from './vacancy/pages/new-vacancy-v2/new-vacancy-v2.component';
import { AllClientsComponent } from './clients/pages/all-clients/all-clients.component';

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
        loadChildren : ()=> import('./vacancy/vacancy.routes').then( r => r.routes)

    },
    {
        path: 'clients',
        loadChildren : ()=> import('./clients/clients.routes').then( r => r.routes)
    },
    {
        path : '**',
        component: NotFoundComponent
    }
];
