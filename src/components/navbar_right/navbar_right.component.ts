import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {APIService} from '../../services/api.service';

@Component({
    selector: 'navbar_right',
    templateUrl: 'navbar_right.component.html'
})
export class NavbarRightComponent {
    constructor(public api:APIService, public router:Router) {
    }

    logout() {
        return this.api.logout();
    }
}
