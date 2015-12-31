import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {AuthService} from '../../services/users/auth-service';

@Component({
    selector: 'menu-bar',
    templateUrl: './components/menu-bar/menu-bar.html',
    directives: [ROUTER_DIRECTIVES]
})
export class MenuBarComponent {
    constructor(public authService:AuthService) {}

    logout() {
        return this.authService.logout();
    }
}
