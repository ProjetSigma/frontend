import {Component, Input} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {APIService} from '../../../shared/services/api-service';
import {User} from '../../../shared/resources/user';

import {PhoneNumberFrenchPipe} from '../profile-display/phone-number-french';

@Component({
    selector: 'user-inline-display',
    templateUrl: './users/user-details/user-inline-display/user-inline-display.html',
    pipes: [PhoneNumberFrenchPipe],
    providers: [APIService, User],
    directives: [NgIf, ROUTER_DIRECTIVES]
})
export class UserInlineDisplayComponent {
    @Input('user') user: User;

    constructor(public api: APIService) {}

    ngOnChanges() {
        if (this.user.clusters !== undefined) {
            console.log(this.user.user_clusters);
        //     for (var i = 0; i < this.user.clusters.length; i++) {
        //         this.api.Cluster.find(this.user.clusters[i].id).then(res => {
        //             var cluster = res;
        //             var index = this.user.clusters.findIndex(function (val) {
        //                 return (val === cluster.id);
        //             });
        //             this.user.clusters[index] = cluster.name;
        //         });
        //     }
        }
    }
}
