import {Component} from '@angular/core';
import {APIService} from '../../services/api.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'navbar_left',
    templateUrl: 'navbar_left.component.html'
})
export class NavbarLeftComponent {
    constructor(public api:APIService, public auth: AuthService) {}
}
