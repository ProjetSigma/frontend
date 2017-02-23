import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, ActivatedRoute, Resolve, Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {APIService} from 'services/api.service';
import {Group} from 'resources/group';

@Injectable()
export class GroupResolver implements Resolve<Group> {
    constructor(private api: APIService) {}

    resolve(route: ActivatedRouteSnapshot): Promise<Group> {
        return this.api.store.find('group', route.params['group_id']).catch((err) => {
            return Promise.resolve(undefined);
        });
    }
}

export class GroupProvider {
    private _g: BehaviorSubject<Group>;
    constructor() { this._g = new BehaviorSubject(new Group()); }
    get group(): Observable<Group> { return this._g.asObservable(); }
    setGroup(g: Group): void { this._g.next(g); }
}

@Component({
    templateUrl: 'group.component.html',
    providers: [GroupResolver, GroupProvider]
})
export class GroupComponent implements OnInit {
    constructor(public route: ActivatedRoute, private router: Router, private grPr: GroupProvider) {}

    ngOnInit() {
        this.route.data.subscribe(data => {
            if (data['group'] === undefined) {
                this.router.navigate(['404'], {skipLocationChange: true});
            } else {
                this.grPr.setGroup(data['group']);
            }
        });
    }

}
