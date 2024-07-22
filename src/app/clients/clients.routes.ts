import { Route } from "@angular/router";
import { NotFoundComponent } from "../shared/pages/not-found/not-found.component";

export const routes : Route[] = [
    {
        path : '',
        pathMatch: 'full',
        redirectTo : 'all'
    },
    {
        path: 'all',
        loadComponent : () => import('./pages/all-clients/all-clients.component').then( c => c.AllClientsComponent)
    },
    {
        path : 'detail/:id',
        loadComponent : () => import('./pages/client-detail/client-detail.component').then( c => c.ClientDetailComponent)

    },
    {
        path : '**',
        component : NotFoundComponent
    }
];
