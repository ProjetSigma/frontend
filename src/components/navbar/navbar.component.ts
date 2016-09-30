import {Component} from '@angular/core';
import {APIService} from '../../services/api.service';

@Component({
    selector: 'navbar',
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent {
    constructor(public api:APIService) {
    }

    logout() {
        return this.api.logout();
    }
}
