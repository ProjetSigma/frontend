import { APIService } from '../../services/api.service';
import { APIAdapterService } from '../../services/adapter.service';
import { AuthService } from '../../services/auth.service';

import { AppComponent } from './app.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { LoginFormComponent } from '../landing-page/login-form/login-form.component';

import { HomeComponent } from '../home/home.component';
import { GroupDeclarations, GroupProviders } from '../groups/group.exporter';


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


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routing }  from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        LandingPageComponent,
        LoginFormComponent,
        HomeComponent,

        ...GroupDeclarations,

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
        APIService,
        AuthService,
        APIAdapterService,
        
        ...GroupProviders
    ],
    
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        NgbModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
