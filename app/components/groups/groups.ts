import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {GroupsListComponent} from './groups-list/groups-list';

@Component({
    selector: 'groups',
    templateUrl: './components/groups/groups.html',
    encapsulation: ViewEncapsulation.Emulated,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', component: GroupsListComponent, useAsDefault: true, as: 'List'}
])
export class GroupsComponent {}
