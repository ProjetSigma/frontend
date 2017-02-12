import {Component} from '@angular/core';
import { Router } from '@angular/router';

import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'navbar_right',
    templateUrl: 'navbar_right.component.html'
})
export class NavbarRightComponent {
    constructor(public api:APIService, public auth:AuthService, public router:Router) {
        
    }
}
