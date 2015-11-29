import {Component} from 'angular2/angular2';
import {AuthService} from '../../services/users/auth-service';

@Component({
    selector: 'login-form',
    templateUrl : './components/login-form/login-form.html',
    providers: [AuthService]
})
export class LoginFormComponent {
    public username;
    public password;
    private authService:AuthService

    constructor(backend:AuthService) {
        this.authService = backend
    }

    login(username,password) {
        return this.authService.authentificate(username,password)
    }
}
