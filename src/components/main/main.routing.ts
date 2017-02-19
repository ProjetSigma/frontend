import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Error404Component } from './404/error404.component';
import { HomeComponent } from './home/home.component';
import { GroupRoute } from './groups/group.routing';

export const MainRoutes = [
    {path: '', component: HomeComponent},
    
    {path: 'home', component: HomeComponent},
    GroupRoute, // -> 'group/:id'
    
    {path: '404', component: Error404Component},
    {path: '**', component: Error404Component}
]