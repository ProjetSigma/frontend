import {Component, Input} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {User} from '../../../shared/services/users/user';
import {PhoneNumberFrenchPipe} from '../profile-display/phone-number-french';
import {ClusterService} from '../../../shared/services/clusters/cluster-service';

@Component({
    selector: 'user-inline-display',
    templateUrl: './users/user-details/user-inline-display/user-inline-display.html',
    pipes: [PhoneNumberFrenchPipe],
    providers: [ClusterService],
    directives: [NgIf, ROUTER_DIRECTIVES]
})
export class UserInlineDisplayComponent {
    @Input('user') user: User;

    constructor(public cluster_service:ClusterService) {}

    ngOnChanges() {
        if (this.user.clusters !== undefined) {
             for (var i=0;i<this.user.clusters.length;i++) {
                 this.cluster_service.getCluster(String(this.user.clusters[i]))
                 .subscribe(res => {
                     var cluster = res.json();
                     var index = this.user.clusters.findIndex(function (val) {
                        return (val === cluster.id);
                     });
                     this.user.clusters[index] = cluster;
                 });
             }
         }
    }
}
