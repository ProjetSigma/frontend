import {Component} from 'angular2/angular2';
import {LoginFormComponent} from '../login-form/login-form';

@Component({
    selector: 'menu-bar',
    templateUrl: './components/menu-bar/menu-bar.html',
    directives: [LoginFormComponent]
})
export class MenuBarComponent { }
