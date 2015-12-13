import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';


@Component({
    selector: 'main',
    templateUrl: './components/main/main.html',
    directives : [ROUTER_DIRECTIVES]
})
export class MainComponent { }
