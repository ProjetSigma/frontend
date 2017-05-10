import {Record} from 'utils/record';
import {Collection} from 'utils/collection';

import {GroupMember} from './group-member';
import {Publication} from './publication';
import {Acknowledgment} from './acknowledgment';
import {User} from './user';
import {Chat} from './chat';

export class Group extends Record {
    public pk: number;
    public name: string;
    public desription: string;
    public score: number; //could be cleaner

    public is_protected: boolean;

    public can_anyone_ask: boolean;
    public need_validation_to_join: boolean;

    public members_visibility: number;
    public group_visibility: number;


    public acknowledging: Acknowledgment[];
    public acknowledged_by: Acknowledgment[];
    public memberships: Collection<GroupMember>;

    public publications: Collection<Publication>;
    public chat: Chat;
}
export const groupRessource = {
    name: 'group',
    klass: Group,
    subCollections: [{
        action: 'members',
        field: 'memberships',
        ressource: 'group-member'
    },
  {
    action: 'publications',
    ressource: 'publication'
  }]
};
