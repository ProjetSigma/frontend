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

import {publicationRessource} from 'resources/publication';
import {eventRessource} from 'resources/event';

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
        this.store.addRessource(publicationRessource);
        this.store.addRessource(eventRessource);

    }



}
