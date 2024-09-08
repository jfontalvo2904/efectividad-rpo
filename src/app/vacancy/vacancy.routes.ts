import { Route } from "@angular/router";
import { NotFoundComponent } from "../shared/pages/not-found/not-found.component";

export const routes : Route[] = [
    {
        path : '',
        pathMatch: 'full',
        redirectTo : 'new-vacancy'
    },
    {
        path:'vacancies',
        loadComponent: ()=> import('./pages/vacancies/vacancies.component').then( v => v.VacanciesComponent)

    },
    {
        path: 'new-vacancy',
        loadComponent : () => import('./pages/new-vacancy-v2/new-vacancy-v2.component').then( c => c.NewVacancyV2Component)
    },
    {
        path: 'edit-vacancy/:id',
        loadComponent : () => import('./pages/edit-vacancy/edit-vacancy.component').then(c => c.EditVacancyComponent)
    },
    {
        path : 'vacancies-per-client/:id',
        loadComponent : () => import('./pages/vacancies-per-client/vacancies-per-client.component').then( c => c.VacanciesPerClientComponent)

    },
    {
        path : '**',
        component : NotFoundComponent
    }
];