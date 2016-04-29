import {Component} from 'angular2/core';
import {RestService} from '../rest-service';
import {AuthService} from '../auth-service';
import {Http} from 'angular2/http';
import {Cluster} from './cluster';

@Component({})
export class ClusterService extends RestService {
    public clusters:Cluster[];

    constructor(public http: Http, public auth: AuthService) {
        super(http, auth);
        this.useResource('cluster');
    }

    getClusters() {
        return this.authRequest()
            .logError('Erreur sur la récupération des clusters')
            .get();
    }

    getCluster(id: string) {
        return this.authRequest(id + '/')
            .logError('Erreur sur la récupération du cluster')
            .get();
    }

    editCluster(cluster:Cluster) {
        var data = this.filter(cluster, []);

        return this.authRequest(cluster.id + '/')
            .logError('Erreur sur la modification du cluster')
            .put(data);
    }
}
