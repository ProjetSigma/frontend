import {Record} from 'utils/record';
import {Group} from './group';
import {User} from './user';

export class GroupPublication extends Record {
    public id: number;

    public group: Group;
    public date: string;
    public user: User;
    public title: string;
    public content: string;
}

export const groupPublicationRessource = {
    name: 'group-publication',
    klass: GroupPublication
};
