import {Component,Input} from '@angular/core';

import {User} from '../../../../resources/user';
import {Group} from '../../../../resources/group'


import {APIService} from '../../../../services/api.service';
import {GroupInlineDisplayComponent} from '../../../groups/group-details/group-inline-display/group-inline-display.component';


@Component({
    selector: 'profile-display',
    templateUrl: 'profile-display.component.html'
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
        if (this.user.memberships) {
            return this.user.memberships.filter(function(membership) {
                return membership.perm_rank < 0;
            });
        } else {
            return [];
        }
    }

    existInvitedMemberships() {
        return this.invitedMemberships().length > 0;
    }

}
