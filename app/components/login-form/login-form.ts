import {Component} from 'angular2/angular2';
import {AuthService} from '../../services/users/auth-service';

@Component({
    selector: 'login-form',
    templateUrl: './components/login-form/login-form.html'
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
