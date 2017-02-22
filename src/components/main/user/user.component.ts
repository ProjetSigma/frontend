import {Component, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, ActivatedRoute, Resolve, Router}   from '@angular/router';

import {APIService} from 'services/api.service';
import {User} from 'resources/user';

@Injectable()
export class UserResolver implements Resolve<User> {
    constructor(private api: APIService) {}

    resolve(route: ActivatedRouteSnapshot) : Promise<User> {
        return this.api.store.find('user', route.params['user_id']).catch((err) => {
            return Promise.resolve(undefined);
        });
    }
}

@Component({
    templateUrl: 'user.component.html',
    providers: [UserResolver]
})
export class UserComponent {
    private user: User;

    constructor(public route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.route.data.subscribe(data => {
            if(data['user'] == undefined) '';
                // this.router.navigate(['404'], {skipLocationChange: true});
            else
                this.user = data['user'];
        });
    }

}
