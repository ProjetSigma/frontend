import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MainComponent } from '../main/main.component';
import { NavbarComponent } from '../navbar/navbar.component';
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
	UsersListComponent,
	UserDetailsComponent,
	UserInlineDisplayComponent,
	ProfileDisplayComponent,
	EditPasswordComponent,
	EditProfileComponent,
	LoginFormComponent,
	PhoneNumberFrenchPipe,
	NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
