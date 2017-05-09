import {Record} from 'utils/record';
import {Collection} from 'utils/collection';
import {User} from './user';

export class Event extends Record {
    public id: number;
    public name: string;
    public description: string;

    public date_start: string;
    public date_end: string;

    public place_name: string;
    public author: User;
}


export const eventRessource = {
    name: 'event',
    klass: Event,
};
