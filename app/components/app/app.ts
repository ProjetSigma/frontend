import {Component, ViewEncapsulation} from 'angular2/angular2';
import {
    ROUTER_DIRECTIVES
} from 'angular2/router';

@Component({
    selector: 'app',
    templateUrl: './components/app/app.html',
    encapsulation: ViewEncapsulation.None,
    directives: [ROUTER_DIRECTIVES]
})
export class AppCmp {}

@Component({
    selector: 'aside',
    templateUrl: './components/app/aside.html'
})
export class Aside {}

@Component({
    selector: 'login-form',
    templateUrl : './components/app/login-form.html'
})
export class LoginForm {
    public username;
    public password;
    login(username,password) {
        console.log("L'utilisateur essaye de se connecter avec les identifiants :",username,"et",password);
    }
}
