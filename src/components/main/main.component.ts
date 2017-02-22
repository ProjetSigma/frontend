import {Component} from '@angular/core';
import {Router}   from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
    templateUrl: './main.component.html'
})
export class MainComponent {
    constructor(private router: Router, private auth: AuthService) {
        auth.isAuthenticated().subscribe((authed) => {
            if(!authed)
                this.router.navigate(["login"], {skipLocationChange: true});
        });
    }
}
