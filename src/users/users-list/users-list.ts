import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {APIService} from '../../shared/services/api-service';
import {UserService} from '../../shared/services/users/user-service';
import {User} from '../../shared/services/users/user';
import {InlineUserDisplayComponent} from '../user-details/inline-display/inline-display';
import {MembershipService} from '../../shared/services/memberships/membership-service';
import {GroupService} from '../../shared/services/groups/group-service';
import {Observable} from 'rxjs/Rx';
import {utils as JSDataUtils} from 'js-data';


@Component({
    selector: 'users-list',
    templateUrl: './users/users-list/users-list.html',
    providers: [UserService, GroupService, MembershipService, APIService, JSDataUtils, Observable],
    directives: [NgFor, ROUTER_DIRECTIVES, InlineUserDisplayComponent]
})
export class UsersListComponent {
    public users: User[] = [];

    constructor(
        public user_service: UserService,
        public group_service: GroupService,
        public membership_service: MembershipService,
        // public cluster_service: ClusterService
        public api: APIService
    ) {
        this.getUsers();
    };

    getUsers() {
        this.user_service.getMe().subscribe(res => {
            var me = res.json();
            Observable.fromPromise(this.api.Cluster.find(1)).subscribe(res => console.log(res), () => console.error('Error'));
            // this.api.Cluster.find(1).subscribe(res => console.log(res), () => console.error('Error'));
            this.getClustersUsers(me);
            this.getAllGroupMembers(me);
        });
    }

    getClustersUsers(user: User) {
        // for (var cluster of user.clusters) {
        //     this.cluster_service.getCluster(String(cluster))
        //         .subscribe(res => {
        //         var users = res.json().users;
        //         for (var user of users) {
        //             var equalToUser = function(val) {
        //                 return (val.id === user.id);
        //             };
        //             if (!this.users.some(equalToUser)) {
        //                 this.users.push(user);
        //             };
        //         };
        //     });
        // };
        // for (var c of user.clusters) {
            this.api.Cluster.find(1).then(function(r) {
                console.error(r);
            });
        // }
    }

    getAllGroupMembers(user: User) {
        for (var group of user.groups) {
            this.group_service.getGroup(String(group))
                .subscribe(res => {
                var group = res.json();
                for (var membership of group.memberships) {
                    this.membership_service.getMembership(String(membership))
                        .subscribe(res => {
                        var membership = res.json();
                        this.user_service.getUser(membership.user)
                            .subscribe(res => {
                            var user = res.json();
                            var equalToUser = function(val) {
                                return (val.id === user.id);
                            };
                            if (!this.users.some(equalToUser)) {
                                this.users.push(res.json());
                            };
                        });
                    });
                };
            });
        };
    }
}
