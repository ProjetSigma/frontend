import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {APIService} from '../../services/api.service';

@Component({
    selector: 'navbar_left',
    templateUrl: 'navbar_left.component.html'
})
export class NavbarLeftComponent {
    constructor(public api:APIService, public router:Router) {
    }

    logout() {
    }
}
