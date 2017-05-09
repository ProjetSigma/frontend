import {Record} from 'utils/record';
import {Collection} from 'utils/collection';

import {Group} from './group';
import {User} from './user';

export class Publication extends Record {
    public pk: number;

    public date: string;
    public title: string;
    public content: string;
    public last_commented: string;

    public number_tags: number;
    public number_likes: number;
    public number_comments: number;

    public internal: boolean;
    //public related_event: Event;

    public author: User;
}

export const publicationRessource = {
    name: 'publication',
    klass: Publication,
};
