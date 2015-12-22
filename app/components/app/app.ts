import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {NgIf} from 'angular2/common';

import {MenuBarComponent} from '../menu-bar/menu-bar';
import {MainComponent} from '../main/main';
import {UsersComponent} from '../users/users';
import {LoginFormComponent} from '../login-form/login-form';
import {AuthService} from '../../services/users/auth-service';
import {SettingsComponent} from '../settings/settings';


@Component({
    selector: 'app',
    templateUrl: './components/app/app.html',
    encapsulation: ViewEncapsulation.None,
    directives: [ROUTER_DIRECTIVES,
        MenuBarComponent, MainComponent, LoginFormComponent, SettingsComponent,
        NgIf]
})
@RouteConfig([
    {path: '/', component: MainComponent, useAsDefault: true, as: 'Main'},
    {path: '/user/...', component: UsersComponent, as: 'Users'},
    {path: '/settings/', component: SettingsComponent, as: 'Settings'},
])
export class AppComponent {
    constructor(public authService:AuthService) {}

    isAuthenticated() {
        return this.authService.isAuthenticated();
    }
}
