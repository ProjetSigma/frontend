import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { MainComponent } from '../main/main.component';
import { MainRoutes } from '../main/main.routing';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', component: MainComponent, children: MainRoutes}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
