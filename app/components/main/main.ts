import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {UsersListComponent} from '../users-list/users-list';


@Component({
    selector: 'main',
    templateUrl: './components/main/main.html',
    directives : [UsersListComponent, ROUTER_DIRECTIVES]
})
export class MainComponent { }
