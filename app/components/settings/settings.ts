import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';


@Component({
    selector: 'settings',
    templateUrl: './components/settings/settings.html',
    directives : [ROUTER_DIRECTIVES]
})
export class SettingsComponent { }
