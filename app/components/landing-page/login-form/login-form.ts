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
    private _authService:AuthService;
    private _passwordError:boolean = false;

    constructor(backend: AuthService) {
        this._authService = backend;
    }

    login(username, password) {
        this._passwordError = false;
        return this._authService.authentificate(username, password)
            .subscribe(
                res => {
                    this.username = '';
                    this.password = '';
                },
                err => {
                    this.password = '';
                    this._passwordError = true;
                }
            );
    }

    logout() {
        return this._authService.logout();
    }

    isAuthenticated() {
        return this._authService.isAuthenticated();
    }
}
