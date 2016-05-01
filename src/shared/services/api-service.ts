import {Component} from 'angular2/core';

import {utils as JSDataUtils, DataStore, Mapper} from 'js-data';
import {HttpAdapter} from 'js-data-http';
import {Observable} from 'rxjs/Rx';

import {AuthService} from './auth-service';
import {clusterSchema} from './schemas/cluster';

@Component({
    providers: [AuthService, JSDataUtils, DataStore, Mapper, Observable]
})
export class APIService {
    protected base_url: string = 'http://127.0.0.1:8000/';
    public DS: DataStore = new DataStore();
    private auth_: AuthService;

    // Resources
    public Cluster: Mapper;

    constructor(public auth: AuthService) {
        this.auth_ = auth;
        // Observable API for JSData.Promise
        // TODO: make it work...
        // Object.defineProperty(
        //     JSDataUtils.Promise.prototype,
        //     'subscribe',
        //     {
        //         value: function (onNext, onError, onComplete) {
        //             return this.then(function (result) {
        //                 setTimeout(function () {
        //                     onNext(result)
        //                 }, 0);
        //                 setTimeout(function () {
        //                     onComplete()
        //                 }, 0);
        //             }, onError);
        //         }
        //     }
        // );
        Object.defineProperty(
            JSDataUtils.Promise.prototype,
            'toObservable',
            {
                value: function() {
                    return Observable.fromPromise(this);
                }
            }
        );

        // Configure headers
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.accessToken
        };

        // Setup DataStore and HttpAdapter
        let httpAdapt = new HttpAdapter({ basePath: this.base_url, httpConfig: {headers: headers}, forceTrailingSlash: true });
        this.DS.registerAdapter('http', httpAdapt, {default: true});

        // Register all Resources
        this.Cluster = this.DS.defineMapper('cluster', {
            schema: clusterSchema,
            applySchema: false // for now: JSData Schema API not stable
        });
        console.log(this.Cluster);
    }
}
