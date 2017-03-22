import {Record} from 'utils/record';
import {Group} from './group';

export class Acknowledgment extends Record {
    public id: number;
    
    public acknowledged: Group;
    public acknowledged_by: Group;
    public date: string;
}

// export const acknowledgmentSchema = new Schema({
	// type: 'object',
    // properties: {
        // id: { type: 'integer' },
        // date: { type: 'string', format: 'date-time' }
    // }
// });

// export const acknowledgmentRelations = {
    // belongsTo: {
        // group: [{
            // localField: 'acknowledged',
            // localKey: 'acknowledged_id'
        // }, {
            // localField: 'acknowledged_by',
            // localKey: 'acknowledged_by_id'
        // }]
    // }
// };

export const acknowledgmentRessource = {
    name: 'acknowledgment',
    klass: Acknowledgment
}