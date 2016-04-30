import {Schema} from 'js-data';

export const clusterSchema = new Schema({
    properties: {
        id: {type: 'number'},
        name: {type: 'string'},
        description: {type: 'string'},
        design: {type: 'string'}
    }
});
