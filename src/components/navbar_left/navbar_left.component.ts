import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {APIService} from 'services/api.service';
import {AuthService} from 'services/auth.service';

@Component({
    selector: 'navbar_left',
    templateUrl: 'navbar_left.component.html'
})
export class NavbarLeftComponent {
    constructor(public api:APIService, public auth: AuthService, private router: Router) {}
    
    logout() {
        this.auth.logout().then(() => {
            this.router.navigate(['']);
        });
    }
}
