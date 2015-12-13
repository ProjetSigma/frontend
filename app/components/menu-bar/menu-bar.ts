import {Component} from 'angular2/core';
import {LoginFormComponent} from '../login-form/login-form';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'menu-bar',
    templateUrl: './components/menu-bar/menu-bar.html',
    directives: [LoginFormComponent, ROUTER_DIRECTIVES]
})
export class MenuBarComponent { }
