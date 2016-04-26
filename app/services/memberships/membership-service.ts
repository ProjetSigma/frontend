import {Component} from 'angular2/core';
import {RestService} from '../rest-service';
import {AuthService} from '../auth-service';
import {Http} from 'angular2/http';
import {Membership} from './membership';

@Component({})
export class MembershipService extends RestService {

    constructor(public http: Http, public auth: AuthService) {
        super(http, auth);
        this.useResource('group-member');
    }

    getMemberships() {
        return this.authRequest()
            .logError('Erreur sur la récupération du membre.')
            .get();
    }

    getMembership(id: string) {
        return this.authRequest(id + '/')
            .logError('Erreur sur la récupération du membre.')
            .get();
    }

    editMembership(membership: Membership) {
        var data = this.filter(membership, []);

        return this.authRequest(membership.id + '/')
            .logError('Erreur sur la modification du membre.')
            .put(data);
    }
}
