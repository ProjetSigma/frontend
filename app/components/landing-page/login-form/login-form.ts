import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';

import {AuthService} from '../../../services/auth-service';

@Component({
    selector: 'login-form',
    templateUrl: './components/landing-page/login-form/login-form.html',
    directives: [NgForm]
})
export class LoginFormComponent {
    public username:string;
    public password:string;
    private authService: AuthService;
    private passwordError:boolean = false;

    constructor(backend: AuthService) {
        this.authService = backend;
    }

    login(username, password) {
        this.passwordError = false;
        return this.authService.authentificate(username, password)
        .subscribe(
            res => {
                this.username = '';
                this.password = '';
            },
            err => {
                this.password = '';
                this.passwordError = true;
                }
        );
    }

    logout() {
        return this.authService.logout();
    }

    isAuthenticated() {
        return this.authService.isAuthenticated();
    }
}
