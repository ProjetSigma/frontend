import {Component, Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, ActivatedRoute, Resolve, CanActivate}   from '@angular/router';
import {RoutingComponents} from '../../utils/routing-component';

import {APIService} from '../../services/api.service';
import {Group} from '../../resources/group';


@Injectable()
export class GroupResolver implements Resolve<Group>, CanActivate {
    constructor(private api: APIService) {}
    private promise: any = null;
    
    canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
        return this.resolve(route).then((obj) => {
            return (obj != null);
        })
    }
    
    resolve(route: ActivatedRouteSnapshot) {
        if(this.promise == null)
            this.promise = this.api.store.find('group', route.params['group_id']).catch((err) => {
                return null;
            });
        return this.promise;
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
