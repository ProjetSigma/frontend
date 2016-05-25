import {Component, Input} from 'angular2/core';
import {NgFor, NgIf, NgSwitchDefault} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {APIService} from '../../../shared/services/api-service';
import {Group} from '../../../shared/resources/group';
import {Membership} from '../../../shared/resources/membership';
import {UserInlineDisplayComponent} from '../../../users/user-details/user-inline-display/user-inline-display';
import * as _ from 'lodash';

@Component({
    selector: 'group-display',
    templateUrl: './groups/group-details/group-display/group-display.html',
    directives: [NgFor, NgIf, NgSwitchDefault, ROUTER_DIRECTIVES, UserInlineDisplayComponent]
})
export class GroupDisplayComponent {
    @Input('group') group: Group;

    constructor(public api: APIService) { };

    //The component is loaded before the answer to the request,
    //that is why we have to update the view with new data
    //once the answer is received alog with the group to display.
    ngOnChanges() {
        if (this.group !== undefined) {
            this.getMembers();
        }
    }

    getMembers() {
        this.api.store.findAll('membership', { 'group': this.group.id }).then(res => {
            for (var membership of this.group.memberships) {
                this.api.store.find('user', membership.user_id);
            };
        });
    }

    realMemberships() {
        if (this.group.memberships) {
            return this.group.memberships.filter(function(membership) {
                return membership.perm_rank > 0;
            });
        } else {
            return [];
        }
    }

    pendingMemberships() {
        if (this.group.memberships) {
            return this.group.memberships.filter(function(membership) {
                return membership.perm_rank === 0;
            });
        } else {
            return [];
        }
    }

    existPendingMemberships() {
        return this.pendingMemberships().length > 0;
    }

    invitedMemberships() {
        if (this.group.memberships) {
            return this.group.memberships.filter(function(membership) {
                return membership.perm_rank < 0;
            });
        } else {
            return [];
        }
    }

    existInvitedMemberships() {
        return this.invitedMemberships().length > 0;
    }

    canJoinGroup() {
        return (this.group.default_member_rank > -1 && !this.api.isInMyGroups(this.group.id));
    }

    joinGroup() {
        this.api.store.create('membership', {
            user_id: this.api.me.id,
            group_id: this.group.id
        });
    }

    canLeaveGroup() {
        return this.api.isInMyGroups(this.group.id);
    }

    leaveGroup() {
        var membership = this.api.getMyMembership(this.group.id);
        this.api.store.destroy('membership', membership.id).then(
            res => {
                _.remove(this.group.memberships, membership);
                _.remove(this.api.me.memberships, membership);
            }
            );
    }

    canAcceptJoinRequests() {
        if (this.api.isInMyGroups(this.group.id)) {
            var membership = this.api.getMyMembership(this.group.id);
            return this.group.req_rank_accept_join_requests< membership.perm_rank;
        } else {
            return false;
        }
    }

    acceptJoinRequest(membership:Membership) {
        //TODO
    }

    rejectJoinRequest(membership:Membership) {
        this.api.store.destroy('membership',membership.id).then(
            res => {
                _.remove(this.group.memberships,membership);
            });
    }

}
