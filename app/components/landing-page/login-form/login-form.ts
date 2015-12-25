import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';

import {AuthService} from '../../../services/users/auth-service';

@Component({
    selector: 'login-form',
    templateUrl: './components/landing-page/login-form/login-form.html',
    directives: [NgForm]
})
export class LoginFormComponent {
    public username;
    public password;
    private authService: AuthService;

    constructor(backend: AuthService) {
        this.authService = backend;
    }

    login(username, password) {

        return this.authService.authentificate(username, password)
        .subscribe(
            res => {
                this.username = '';
                this.password = '';
            },
            err => this.password = ''
        );
    }

    logout() {
        return this.authService.logout();
    }

    isAuthenticated() {
        return this.authService.isAuthenticated();
    }
}
