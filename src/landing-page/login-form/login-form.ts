import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';

import {APIService} from '../../shared/services/api-service';

@Component({
    selector: 'login-form',
    templateUrl: './landing-page/login-form/login-form.html',
    directives: [NgForm]
})
export class LoginFormComponent {
    public username:string;
    public password:string;
    private _passwordError:boolean = false;

    constructor(private api:APIService) {
    }

    login(username, password) {
        this._passwordError = false;
        return this.api.login(username, password)
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
        return this.api.logout();
    }

    isAuthenticated() {
        return this.api.isAuthenticated();
    }
}
