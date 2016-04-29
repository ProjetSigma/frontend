import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {AuthService} from '../shared/services/auth-service';

@Component({
    selector: 'menu-bar',
    templateUrl: './menu-bar/menu-bar.html',
    directives: [ROUTER_DIRECTIVES]
})
export class MenuBarComponent {
    constructor(public auth_service:AuthService) {
    }

    logout() {
        return this.auth_service.logout();
    }
}
