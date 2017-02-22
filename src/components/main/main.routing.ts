import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Error404Component } from './404/error404.component';
import { HomeComponent } from './home/home.component';
import { GroupRoute } from './group/group.routing';
import { UserRoute } from './user/user.routing';

export const MainRoutes = [
    {path: '', component: HomeComponent},

    {path: 'home', component: HomeComponent},

    GroupRoute, // -> 'group/:group_id'
    UserRoute, // -> 'user/:user_id'

    {path: '404', component: Error404Component},
    {path: '**', component: Error404Component}
]
