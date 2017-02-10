import { Routes } from '@angular/router';

import { GroupPublicationsComponent } from './publications/group-publications.component'

export const GroupRoutes: Routes = [
    {
        path: '',
        redirectTo: 'publications',
        pathMatch: 'full'
	},
    {path: 'publications', component: GroupPublicationsComponent}
]