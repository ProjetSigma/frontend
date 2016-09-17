import {Component} from '@angular/core';

import {APIService} from '../../services/api.service';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
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
