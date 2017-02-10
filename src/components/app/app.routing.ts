import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { GroupComponent } from '../groups/group.component';
import { GroupRoutes } from '../groups/group.routing';

// import { UsersListComponent } from '../users/users-list/users-list.component';
// import { GroupDetailsComponent } from '../groups/group-details/group-details.component';
// import { UserDetailsComponent } from '../users/user-details/user-details.component';
// import { GroupsListComponent } from '../groups/groups-list/groups-list.component';
// import { SettingsComponent } from '../settings/settings.component';

const appRoutes: Routes = [
	{
	  path: '',
	  redirectTo: '/home',
	  pathMatch: 'full'
	},
    {path: 'home', component: HomeComponent},
	{path: 'group/:id', component: GroupComponent, children:GroupRoutes}
    
	// {path: 'group/:id/members', component: GroupDetailsComponent},
    // {path: 'settings', component: SettingsComponent},
	// {path: 'users', component: UsersListComponent},
	// {path: 'user/:id', component: UserDetailsComponent}
];
export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
