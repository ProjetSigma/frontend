import {Component} from 'angular2/core';
import {RestService} from '../rest-service';
import {AuthService} from '../auth-service';
import {Http} from 'angular2/http';
import {Group} from './group';

@Component({})
export class GroupService extends RestService {
    public groups:Group[];

    constructor(public http: Http, public auth: AuthService) {
        super(http, auth);
        this.useResource('group');
    }

    getGroups() {
        return this.authRequest()
            .logError('Erreur sur la récupération des groupes')
            .get();
    }

    getGroup(id: string) {
        return this.authRequest(id + '/')
            .logError('Erreur sur la récupération du groupe')
            .get();
    }

    editGroup(group:Group) {
        var data = this.filter(group, []);

        return this.authRequest(group.id + '/')
            .logError('Erreur sur la modification du groupe')
            .put(data);
    }
}
