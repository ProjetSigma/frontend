import {Record} from 'utils/record';
import {Group} from './group';

export enum GroupFieldType {
    Number = 0,
    String = 1,
    Choice = 2,
    Email = 3
}

export class GroupField extends Record {
    public id: number;
    public group: Group;

    public name: string;
    public type: GroupFieldType;
    public accept: string;

    public is_protected: boolean;
    public multiple_values_allowed: boolean;
}

export const groupFieldRessource = {
    name: 'group-field',
    klass: GroupField
};
