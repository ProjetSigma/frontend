import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { Error404Component } from '../error404/error404.component';
import { GroupRoute } from '../groups/group.exporter';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    
    GroupRoute, // -> 'group/:id'
    
    {path: '**', component: Error404Component}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
