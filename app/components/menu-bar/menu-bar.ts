import {Component} from 'angular2/core';
import {LoginFormComponent} from '../login-form/login-form';

@Component({
    selector: 'menu-bar',
    templateUrl: './components/menu-bar/menu-bar.html',
    directives: [LoginFormComponent]
})
export class MenuBarComponent { }
