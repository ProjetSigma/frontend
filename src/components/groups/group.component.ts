import {Component, Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, ActivatedRoute, Resolve, Router}   from '@angular/router';
import {GroupRoutingComponents} from './group.routing';

import {APIService} from '../../services/api.service';
import {Group} from '../../resources/group';


@Injectable()
export class GroupResolver implements Resolve<Group> {
    constructor(private api: APIService) {}
    
    resolve(route: ActivatedRouteSnapshot) : Promise<Group> {
        return this.api.store.find('group', route.params['group_id']).catch((err) => {
            return Promise.resolve(undefined);
        });
    }
}

@Component({
    templateUrl: 'group.component.html',
    providers: [ GroupResolver, GroupRoutingComponents.provider ]
})
export class GroupComponent {
    public rc = GroupRoutingComponents;
    
    constructor(@Inject(GroupRoutingComponents.token) public outputs, public route: ActivatedRoute, private router: Router) {}
    
    ngOnInit() {
        this.route.data.subscribe(data => {
            if(data['group'] == undefined)
                this.router.navigate(['404'], {skipLocationChange: true});
            this.outputs.data['group'] = data['group'];
        });
    }
    
}