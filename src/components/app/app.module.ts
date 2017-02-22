import { AppComponent } from './app.component';
import { LoginComponent } from '../login/login.component';

import { MainDeclarations, MainProviders } from '../main/main.exports';


import { NavbarLeftComponent } from '../navbar_left/navbar_left.component';
import { NavbarRightComponent } from '../navbar_right/navbar_right.component';
import { SettingsComponent } from '../settings/settings.component';
import { EditPasswordComponent } from '../settings/edit-password/edit-password.component';
import { EditProfileComponent } from '../settings/edit-profile/edit-profile.component';
import { UsersListComponent } from '../users/users-list/users-list.component';
import { UserDetailsComponent } from '../users/user-details/user-details.component';
import { UserInlineDisplayComponent } from '../users/user-details/user-inline-display/user-inline-display.component';
import { ProfileDisplayComponent } from '../users/user-details/profile-display/profile-display.component';
import { PhoneNumberFrenchPipe } from '../users/phone-number-french';

import { AuthService, AuthInitializer } from 'services/auth.service';
import { WebSocketService } from 'services/ws.service';
import { APIAdapterService } from 'services/adapter.service';
import { APIService } from 'services/api.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoutingModule }  from './app.routing';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,

        ...MainDeclarations,

        SettingsComponent,
        UsersListComponent,
        UserDetailsComponent,
        UserInlineDisplayComponent,
        ProfileDisplayComponent,
        EditPasswordComponent,
        EditProfileComponent,
        PhoneNumberFrenchPipe,
        NavbarLeftComponent,
        NavbarRightComponent
    ],
    providers: [
        AuthService,
        WebSocketService,
        APIAdapterService,
        APIService,

        AuthInitializer,

        ...MainProviders
    ],

    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RoutingModule,
        NgbModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
