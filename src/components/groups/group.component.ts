import {Component, Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, ActivatedRoute, Resolve}   from '@angular/router';
import {RoutingComponents} from '../../utils/routing-component';

import {APIService} from '../../services/api.service';
import {Group} from '../../resources/group';


@Injectable()
export class GroupResolver implements Resolve<Group> {
    constructor(private api: APIService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.api.store.find('group', route.params['group_id']);
    }
}


var rc : RoutingComponents = new RoutingComponents([
    {name: 'home', selector: 'group-publications', inputs: ['group'], route: {
        path: ''
    }}
])


@Component({
    templateUrl: 'group.component.html',
    providers: [ rc.provider, GroupResolver ]
})
export class GroupComponent {
    public rc : RoutingComponents = rc;
    
    constructor(@Inject(rc.provider) outputs, public route: ActivatedRoute) {
        outputs.data['group'] = route.snapshot.data['group'];
    };
    
    enabledRoute(name) {
        return (name == "publications");
    }
}

export const GroupRoutes = rc.routes;
export const GroupRoutesComponents = rc.components;
