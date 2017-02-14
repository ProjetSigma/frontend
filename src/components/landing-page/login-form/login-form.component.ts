import {Component} from '@angular/core';

import {AuthService, AuthErrorCallback} from '../../../services/auth.service';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
    public username:string;
    public password:string;
    
    private _passwordError:boolean = false;

    constructor(private auth:AuthService) {}
    
    login() {
        this._passwordError = false;
        this.auth.authenticate(
            this.username,
            this.password
        ).catch((err) => {
            this._passwordError = true;
        });
    }

}
