import {Injectable} from '@angular/core';

import {Store} from 'utils/store';
import {Record} from 'utils/record';
import {Collection} from 'utils/collection';
import {APIAdapterService} from './adapter.service';

import {acknowledgmentRessource} from 'resources/acknowledgment';
import {acknowledgmentInvitationRessource} from 'resources/acknowledgment-invitation';

import {groupRessource} from 'resources/group';
import {groupFieldRessource} from 'resources/group-field';
import {groupFieldValueRessource} from 'resources/group-field-value';

import {groupMemberRessource} from 'resources/group-member';
import {groupInvitationRessource} from 'resources/group-invitation';
import {userRessource, User} from 'resources/user';


@Injectable()
export class APIService {

    public store: Store;
    public me: User;

    constructor(protected adapter: APIAdapterService) {
        this.store = new Store(this.adapter);
        
        this.store.addRessource(acknowledgmentRessource);
        this.store.addRessource(acknowledgmentInvitationRessource);
        
        this.store.addRessource(groupRessource);
        this.store.addRessource(groupFieldRessource);
        this.store.addRessource(groupFieldValueRessource);
        
        this.store.addRessource(groupMemberRessource);
        this.store.addRessource(groupInvitationRessource);
        this.store.addRessource(userRessource);
        
        // this.store.find('group', 3).then((obj) => console.log(obj));
        // this.store.find('group').then((items) => {
            // for(let item of items) {
                // console.log(item)
            // }
        // });
        // this.store.find('group', 7, 'members').then((items: Collection<any>) => {
            // items.forEach((item) => {
                // console.log(item)
            // });
        // });

        // this.store.defineMapper('acknowledgment', acknowledgmentMapper);
        // this.store.defineMapper('acknowledgment-invitation', acknowledgmentInvitationMapper);
        // this.store.defineMapper('user', userMapper);
        // this.store.defineMapper('group', groupMapper);
        // this.store.defineMapper('group-field', groupFieldMapper);
        // this.store.defineMapper('group-field-value', groupFieldValueMapper);
        // this.store.defineMapper('membership', membershipMapper);
        // this.store.defineMapper('group-invitation', groupInvitationMapper);
    }

}
