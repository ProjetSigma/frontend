import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { UsersListComponent } from '../users/users-list/users-list.component';
import { UserDetailsComponent } from '../users/user-details/user-details.component';
import { GroupsListComponent } from '../groups/groups-list/groups-list.component';
import { GroupDetailsComponent } from '../groups/group-details/group-details.component';
import { SettingsComponent } from '../settings/settings.component';

const appRoutes: Routes = [
	{
	  path: '',
	  redirectTo: '/main',
	  pathMatch: 'full'
	},
    {path: 'main', component: MainComponent},
    {path: 'group', component: GroupsListComponent},
	{path: 'group/:id', component: GroupDetailsComponent},
    {path: 'settings', component: SettingsComponent},
	{path: 'users', component: UsersListComponent},
	{path: 'user/:id', component: UserDetailsComponent}
];
export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
