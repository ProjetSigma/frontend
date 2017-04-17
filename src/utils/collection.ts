import {Record} from 'utils/record';

export interface Collection<T> {
    length: number;
    
    add(key: string);
    get(index: number): T;
    forEach(cb: {(obj: T)});
    filter(cb: {(obj: T): boolean});
    
    [Symbol.iterator](): Iterator<T>;
}

// This collection class stores hash to reference store records
export class HashCollection<T> extends Record implements Iterable<T>, Collection<T> {
    public records: string[];
    
    constructor(store: any, hash: string, resName: string) {
        super(store, hash, resName);
        this.records = new Array();
    }
    
    get length(): number {
        return this.records.length;
    }
    
    add(key: string) {
        this.records.push(key);
    }
    
    get(index: number): T {
        return this.__.store.get(this.records[index]);
    }
    
    forEach(cb: {(obj: T)}) {
        for(const hash of this.records) {
            cb(this.__.store.get(hash));
        }
    }
    
    filter(f: {(obj: T): boolean}) {
        return new FilteredHashCollection(this, f);
    }
    
    [Symbol.iterator](): Iterator<T> {
        let self = this;
        let step = 0;
        return {
            next(): IteratorResult<T> {
                if(step >= self.records.length) return {value: undefined, done: true};
                else return {value: self.get(step++), done: false};
            }
        };
    }
}

export class FilteredHashCollection<T> extends HashCollection<T> {
    constructor(collec: HashCollection<T>, filter: {(obj: T): boolean}) {
        super(collec.__.store, '', collec.__.resName);
        this.records = new Array();
        
        for(const hash of collec.records) {
            if(filter(this.__.store.get(hash)))
                this.records.push(hash);
        }
    }
}

export class ProxyCollection<T> extends Record implements Iterable<T>, Collection<T> {
    constructor(store: any, hash: string, resName: string) {
        super(store, hash, resName);
    }
    
    get proxied(): Collection<T> {
        return this.__.store.get( this.__.hash );
    }
    
    get length(): number {
        return this.proxied.length || 0;
    }
    
    add(key: string) {
        this.proxied && this.proxied.add(key);
    }
    
    get(index: number): T {
        return this.proxied.get(index) || undefined;
    }
    
    forEach(cb) {
        this.proxied && this.proxied.forEach(cb);
    }
    
    filter(f) {
        return this.proxied.filter(f) || undefined;
    }
    
    [Symbol.iterator](): Iterator<T> {
        return this.proxied[Symbol.iterator]() || {next(){ return {value:undefined, done:true}; }};
    }
}

// This collection is a proxy collection used for sub collections. Any call simply fetch and redirect to the corresponding Collection
// export class SubCollection extends Record implements Iterable<any>, Collection {
    // constructor(store: any, hash: string, resName: string) {
        // super(store, hash, resName);
        // this.records = new Array();
    // }
    
    // add(key: string) {
        // this.records.push(key);
    // }
    
    // get(index: number): any {
        // return this.__.store.getByHash(this.records[index]);
    // }
    
    // forEach(cb) {
        // for(const hash of this.records) {
            // cb(this.__.store.getByHash(hash));
        // }
    // }
    
    // [Symbol.iterator](): Iterator<any> {
        // let self = this;
        // let step = 0;
        // return {
            // next(): IteratorResult<any> {
                // if(step >= self.records.length) return {value: undefined, done: true};
                // else return {value: self.get(step++), done: false};
            // }
        // };
    // }
// }