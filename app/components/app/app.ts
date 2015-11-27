import {Component, ViewEncapsulation} from 'angular2/angular2';
import {
    ROUTER_DIRECTIVES
} from 'angular2/router';

@Component({
    selector: 'login-form',
    templateUrl : './components/app/login-form.html'
})
export class LoginFormComponent {
    public username;
    public password;
    login(username,password) {
        console.log(`L'utilisateur essaye de se connecter avec les identifiants :`,username,`et`,password);
    }
}

@Component({
    selector: 'menu-bar',
    templateUrl: './components/app/menu-bar.html',
    directives : [LoginFormComponent]
})
export class MenuBarComponent {}


@Component({
    selector: 'app',
    templateUrl: './components/app/app.html',
    encapsulation: ViewEncapsulation.None,
    directives: [ROUTER_DIRECTIVES,MenuBarComponent]
})
export class AppComponent {}
