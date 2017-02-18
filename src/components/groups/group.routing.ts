import {ActivatedRouteSnapshot, ActivatedRoute, Resolve, Router}   from '@angular/router';
import {RoutingComponents, RouteInput, newRoutingComponents} from '../../utils/routing-component';


let group_input : RouteInput = {
    input: "group",
    required: true
};

export const GroupRoutingComponents : RoutingComponents = newRoutingComponents([
    {name: 'publications', selector: 'group-publications', inputs: [group_input], route: {path: ''} },
    {name: 'publications', selector: 'group-publications', inputs: [group_input], route: {path: 'publications'} },
    {name: 'members', selector: 'group-members', inputs: [group_input], route: {path: 'members'} },
]);