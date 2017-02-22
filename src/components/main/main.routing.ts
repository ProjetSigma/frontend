import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Error404Component } from './404/error404.component';
import { HomeComponent } from './home/home.component';
import { GroupsListComponent } from './group/groups-list/groups-list.component';
import { GroupRoute } from './group/group.routing';
import { UserRoute } from './user/user.routing';

export const MainRoutes = [
    {path: '', component: HomeComponent},

    {path: 'home', component: HomeComponent},

    GroupRoute, // -> 'group/:group_id'
    UserRoute, // -> 'user/:user_id'
    {path: 'group', component: GroupsListComponent},
    {path: '404', component: Error404Component},
    {path: '**', component: Error404Component}
]
