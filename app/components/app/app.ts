import {Component, ViewEncapsulation} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {MenuBarComponent} from '../menu-bar/menu-bar';
import {MainComponent} from '../main/main';
import {AuthService} from '../../services/users/auth-service';


@Component({
    selector: 'app',
    templateUrl: './components/app/app.html',
    encapsulation: ViewEncapsulation.None,
    directives: [ROUTER_DIRECTIVES, MenuBarComponent,MainComponent]
})
export class AppComponent {
    constructor(auth_service: AuthService) {
        var accessToken: string = localStorage.getItem('authToken');
        if (accessToken !== undefined && accessToken !== '') {
            auth_service.accessToken = accessToken;
            auth_service.isConnected = true;
        }
    }
}
