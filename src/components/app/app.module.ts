import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MainComponent } from '../main/main.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { routing,
         appRoutingProviders }  from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LandingPageComponent,
    LoginFormComponent
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
