import {Component,Input} from 'angular2/core';
import {NgFor, NgIf} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {User} from '../../../shared/resources/user';
import {APIService} from '../../../shared/services/api-service';

import {PhoneNumberFrenchPipe} from './phone-number-french';
import {GroupInlineDisplayComponent} from '../../../groups/group-details/group-inline-display/group-inline-display';

@Component({
    selector: 'profile-display',
    templateUrl: './users/user-details/profile-display/profile-display.html',
    pipes: [PhoneNumberFrenchPipe],
    directives: [NgFor, NgIf, ROUTER_DIRECTIVES, GroupInlineDisplayComponent]
})
export class ProfileDisplayComponent {
    @Input('user') user: User;

    constructor(public api:APIService) {};

    ngOnChanges() {
        if (this.user.id !== undefined) {
            this.getGroups();
        };
    }

    getGroups() {
        this.api.store.findAll('membership',{'user':this.user.id}).then(res => {
            for (var membership of this.user.memberships) {
                this.api.store.find('group',membership.group_id);
            };
        });
    }

    realMemberships() {
        if (this.user.memberships) {
            return this.user.memberships.filter(function(membership) {
                return membership.perm_rank > 0;
            });
        } else {
            return [];
        }
    }

    pendingMemberships() {
        if (this.user.memberships) {
            return this.user.memberships.filter(function(membership) {
                return membership.perm_rank === 0
            });
        } else {
            return [];
        }
    }

    existPendingMemberships() {
        return this.pendingMemberships().length > 0;
    }

    invitedMemberships() {
        if (this.user.memberships) {
            return this.user.memberships.filter(function(membership) {
                return membership.perm_rank < 0
            });
        } else {
            return [];
        }
    }

    existInvitedMemberships() {
        return this.invitedMemberships().length > 0;
    }

}
