export class RecordInternal {
    public store: any;
    public record: any;
    public hash: string;
    public resName: string;
    
    public invalidated: boolean;
    
    constructor(store: any, record: any, hash: string, resName: string) {
        this.store = store;
        this.record = record;
        this.hash = hash;
        this.resName = resName;
        
        this.invalidated = false;
    }
    
    invalidate() {
        this.invalidated = false;
    }
    
    sub(actionName: string, resName: string) {
        return this.store.find(this.resName, this.id(), actionName, resName);
    }
    
    id() {
        const idField = this.store.getRessource(this.resName).idField;
        return this.record[idField] || this.record['pk'] || this.record['id'];
    }
}

export interface RecordConstructor {
    new(store?: any, hash?: string, resName?: string): Record
}

export class Record {
    public __: RecordInternal;
    constructor(store?: any, hash?: string, resName?: string) {
        this.__ = new RecordInternal(store, this, hash, resName);
    }
}