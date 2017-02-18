import {Component} from '@angular/core';
import {Router}   from '@angular/router';

import {AuthService, AuthErrorCallback} from '../../../services/auth.service';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
    public username:string;
    public password:string;
    
    private hasPasswordError:boolean = false;

    constructor(private auth:AuthService, private router: Router) {}
    
    login() {
        this.hasPasswordError = false;
        this.auth.authenticate(
            this.username,
            this.password
        ).then(
            (resp) => {
                if(window.location.pathname == "/login")
                    this.router.navigate(['']);
                else
                    this.router.navigateByUrl(window.location.pathname);
            },
            (err) => {
                this.hasPasswordError = true;
            }
        );
    }

}
