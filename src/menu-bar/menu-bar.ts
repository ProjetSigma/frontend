import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {APIService} from '../shared/services/api-service';

@Component({
    selector: 'menu-bar',
    templateUrl: './menu-bar/menu-bar.html',
    directives: [ROUTER_DIRECTIVES]
})
export class MenuBarComponent {
    constructor(public api:APIService) {
    }

    logout() {
        return this.api.logout();
    }
}
