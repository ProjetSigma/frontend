import {Component} from '@angular/core';

import {AuthService, AuthErrorCallback} from '../../../services/auth.service';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
    public username:string;
    public password:string;
    
    private error_callback: AuthErrorCallback;
    private _passwordError:boolean = false;

    constructor(private auth:AuthService) {
        this.error_callback = (err => this.handle_error(err));
        this.auth.add_error_callback(this.error_callback);
    }
    
    ngOnDestroy() {
        this.auth.remove_error_callback(this.error_callback)
    }
    
    login() {
        this._passwordError = false;
        this.auth.authenticate(
            this.username,
            this.password
        )
    }
    
    handle_error(err) {
        this._passwordError = true;
    }   

}
