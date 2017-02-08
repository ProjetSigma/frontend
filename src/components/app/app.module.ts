///<reference path="../../../node_modules/@ng-bootstrap/ng-bootstrap/index.d.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MainComponent } from '../main/main.component';
import { NavbarLeftComponent } from '../navbar_left/navbar_left.component';
import { NavbarRightComponent } from '../navbar_right/navbar_right.component';
import { SettingsComponent } from '../settings/settings.component';
import { EditPasswordComponent } from '../settings/edit-password/edit-password.component';
import { EditProfileComponent } from '../settings/edit-profile/edit-profile.component';
import { UsersListComponent } from '../users/users-list/users-list.component';
import { UserDetailsComponent } from '../users/user-details/user-details.component';
import { UserInlineDisplayComponent } from '../users/user-details/user-inline-display/user-inline-display.component';
import { ProfileDisplayComponent } from '../users/user-details/profile-display/profile-display.component';
import { GroupsListComponent } from '../groups/groups-list/groups-list.component';
import { GroupDetailsComponent } from '../groups/group-details/group-details.component';
import { GroupInlineDisplayComponent } from '../groups/group-details/group-inline-display/group-inline-display.component';
import { GroupDisplayComponent } from '../groups/group-details/group-display/group-display.component';
import { GroupPublicationsComponent } from '../groups/group-details/group-publications/group-publications.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { LoginFormComponent } from '../landing-page/login-form/login-form.component';
import { PhoneNumberFrenchPipe } from '../users/phone-number-french';
import { routing, appRoutingProviders }  from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LandingPageComponent,
	SettingsComponent,
	GroupsListComponent,
	GroupInlineDisplayComponent,
	GroupDisplayComponent,
	GroupDetailsComponent,
  GroupPublicationsComponent,
	UsersListComponent,
	UserDetailsComponent,
	UserInlineDisplayComponent,
	ProfileDisplayComponent,
	EditPasswordComponent,
	EditProfileComponent,
	LoginFormComponent,
	PhoneNumberFrenchPipe,
	NavbarLeftComponent,
	NavbarRightComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NgbModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
