import {Component} from 'angular2/angular2';

@Component({
    selector: 'login-form',
    templateUrl : './components/login-form/login-form.html'
})
export class LoginFormComponent {
    public username;
    public password;
    login(username,password) {
        console.log(`L'utilisateur essaye de se connecter avec les identifiants :`,username,`et`,password);
    }
}
